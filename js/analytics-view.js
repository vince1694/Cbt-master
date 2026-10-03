/**
 * Analytics & Performance Center
 * Interactive SVG visual charts, subject mastery bars, weak-topic detector,
 * and estimated JAMB/WAEC score predictor.
 */
import { Storage } from './storage.js';

export const AnalyticsView = {
  renderAnalyticsPage(container) {
    const history = Storage.getTestHistory();
    const analytics = Storage.getAnalytics();
    const profile = Storage.getUserProfile();

    const totalTests = history.length;
    const avgScore = analytics.averagePercentage || 0;
    const highestScore = analytics.highestScore || 0;
    
    // Estimate 400-mark JAMB score based on simulation average
    const estimatedJambScore = Math.min(400, Math.round((avgScore / 100) * 400));

    // Weak topics detector (find subjects with < 60% accuracy)
    const weakSubjects = [];
    const strongSubjects = [];

    Object.entries(analytics.subjectStats || {}).forEach(([subject, stat]) => {
      if (stat.answered >= 5) {
        const pct = Math.round((stat.correct / stat.answered) * 100);
        if (pct < 60) {
          weakSubjects.push({ subject, pct, answered: stat.answered, correct: stat.correct });
        } else if (pct >= 75) {
          strongSubjects.push({ subject, pct, answered: stat.answered, correct: stat.correct });
        }
      }
    });

    const html = `
      <div class="analytics-page-wrapper">
        <!-- Hero Header -->
        <div class="an-hero-card">
          <div class="an-badge-row">
            <span class="an-pill">📊 Diagnostic Intelligence</span>
            <span class="an-pill-sec">Real-time Performance Metrics</span>
          </div>
          <h1 class="an-title">Performance & Score Analytics</h1>
          <p class="an-subtitle">Track your accuracy trends, identify weak topic areas before exam day, and monitor your projected JAMB UTME aggregate score.</p>
        </div>

        <!-- 4 Key Metrics Cards -->
        <div class="an-metrics-grid">
          <div class="an-stat-card">
            <div class="an-card-icon">🎯</div>
            <div class="an-stat-data">
              <span class="an-stat-val">${estimatedJambScore} <small>/ 400</small></span>
              <span class="an-stat-label">Projected JAMB Score</span>
            </div>
          </div>

          <div class="an-stat-card">
            <div class="an-card-icon">📈</div>
            <div class="an-stat-data">
              <span class="an-stat-val">${avgScore}%</span>
              <span class="an-stat-label">Average Accuracy</span>
            </div>
          </div>

          <div class="an-stat-card">
            <div class="an-card-icon">⚡</div>
            <div class="an-stat-data">
              <span class="an-stat-val">${highestScore}%</span>
              <span class="an-stat-label">Highest Score Achieved</span>
            </div>
          </div>

          <div class="an-stat-card">
            <div class="an-card-icon">📝</div>
            <div class="an-stat-data">
              <span class="an-stat-val">${totalTests}</span>
              <span class="an-stat-label">Completed Simulations</span>
            </div>
          </div>
        </div>

        <!-- Weakness Warning Alert (if any weak topics) -->
        ${weakSubjects.length > 0 ? `
          <div class="an-alert-weakness">
            <div class="an-alert-icon">⚠️</div>
            <div class="an-alert-content">
              <h4>Weak Topics Flagged for Rapid Intervention</h4>
              <p>Your performance in the following subjects is currently below 60% accuracy. We recommend targeted mini-drills before full mock tests:</p>
              <div class="an-weak-chips">
                ${weakSubjects.map(w => `
                  <span class="an-weak-chip">
                    <strong>${w.subject}</strong>: ${w.pct}% accuracy (${w.correct}/${w.answered})
                  </span>
                `).join('')}
              </div>
            </div>
            <button class="btn btn-primary an-drill-weak-btn" id="btn-drill-weak">
              <span>⚡ Practice Weak Topics</span>
            </button>
          </div>
        ` : ''}

        <!-- Charts Grid -->
        <div class="an-charts-grid">
          <!-- Score Trend Line Chart -->
          <div class="an-chart-card">
            <div class="an-chart-header">
              <h3>📈 Chronological Score Trend</h3>
              <span class="an-chart-sub">Recent test score progression (%)</span>
            </div>
            <div class="an-svg-container">
              ${this.generateTrendSvg(history)}
            </div>
          </div>

          <!-- Subject Mastery Breakdown -->
          <div class="an-chart-card">
            <div class="an-chart-header">
              <h3>🎯 Subject Mastery Breakdown</h3>
              <span class="an-chart-sub">Correct response rate by subject</span>
            </div>
            <div class="an-subjects-list">
              ${this.generateSubjectBars(analytics.subjectStats)}
            </div>
          </div>
        </div>

        <!-- Recent Test History Table -->
        <div class="an-history-card">
          <div class="an-chart-header">
            <h3>📑 Detailed Simulation History</h3>
            <span class="an-chart-sub">Record of your recent practice examinations</span>
          </div>
          <div class="an-table-wrapper">
            <table class="an-table">
              <thead>
                <tr>
                  <th>Date & Time</th>
                  <th>Simulation Title</th>
                  <th>Exam Body</th>
                  <th>Score</th>
                  <th>Percentage</th>
                  <th>Time Spent</th>
                </tr>
              </thead>
              <tbody>
                ${history.length === 0 ? `
                  <tr>
                    <td colspan="6" class="text-center py-4 text-muted">No simulation history recorded yet. Complete a practice test to view analytics.</td>
                  </tr>
                ` : history.slice(0, 10).map(t => {
                  const pct = Math.round((t.score / t.totalQuestions) * 100);
                  const isPass = pct >= 50;
                  const dateStr = t.timestamp ? new Date(t.timestamp).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' }) : 'Recent';
                  return `
                    <tr>
                      <td>${dateStr}</td>
                      <td><strong>${t.title || 'Practice Test'}</strong></td>
                      <td><span class="badge ${t.examType === 'JAMB' ? 'badge-primary' : 'badge-accent'}">${t.examType || 'JAMB'}</span></td>
                      <td>${t.score} / ${t.totalQuestions}</td>
                      <td><span class="an-pct-pill ${isPass ? 'is-pass' : 'is-fail'}">${pct}%</span></td>
                      <td>${t.timeSpentMinutes || 10} mins</td>
                    </tr>
                  `;
                }).join('')}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    `;

    container.innerHTML = html;

    const weakBtn = container.querySelector("#btn-drill-weak");
    if (weakBtn) {
      weakBtn.addEventListener("click", () => {
        window.location.hash = "#question-browser";
      });
    }
  },

  /**
   * Generate pure SVG smooth trend line chart
   */
  generateTrendSvg(history) {
    if (!history || history.length === 0) {
      return `
        <div class="an-empty-chart">
          <span>📊 Take your first CBT simulation to render score trend chart</span>
        </div>
      `;
    }

    const recent = [...history].reverse().slice(-10);
    const points = recent.map(t => Math.round((t.score / t.totalQuestions) * 100));

    const width = 600;
    const height = 220;
    const padding = 35;

    const innerWidth = width - padding * 2;
    const innerHeight = height - padding * 2;

    const stepX = points.length > 1 ? innerWidth / (points.length - 1) : innerWidth / 2;

    const coords = points.map((val, idx) => {
      const x = points.length === 1 ? width / 2 : padding + idx * stepX;
      const y = padding + innerHeight - (val / 100) * innerHeight;
      return { x, y, val };
    });

    const pathD = coords.reduce((acc, pt, i, arr) => {
      if (i === 0) return `M ${pt.x},${pt.y}`;
      const prev = arr[i - 1];
      const cx = (prev.x + pt.x) / 2;
      return `${acc} C ${cx},${prev.y} ${cx},${pt.y} ${pt.x},${pt.y}`;
    }, "");

    const areaD = `${pathD} L ${coords[coords.length - 1].x},${height - padding} L ${coords[0].x},${height - padding} Z`;

    return `
      <svg viewBox="0 0 ${width} ${height}" class="an-svg-chart">
        <defs>
          <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#10b981" stop-opacity="0.35"/>
            <stop offset="100%" stop-color="#10b981" stop-opacity="0.0"/>
          </linearGradient>
        </defs>

        <!-- Horizontal Grid Lines -->
        <line x1="${padding}" y1="${padding}" x2="${width - padding}" y2="${padding}" stroke="rgba(255,255,255,0.08)" stroke-dasharray="4"/>
        <text x="12" y="${padding + 4}" fill="rgba(255,255,255,0.4)" font-size="10">100%</text>

        <line x1="${padding}" y1="${padding + innerHeight * 0.5}" x2="${width - padding}" y2="${padding + innerHeight * 0.5}" stroke="rgba(255,255,255,0.08)" stroke-dasharray="4"/>
        <text x="12" y="${padding + innerHeight * 0.5 + 4}" fill="rgba(255,255,255,0.4)" font-size="10">50%</text>

        <line x1="${padding}" y1="${height - padding}" x2="${width - padding}" y2="${height - padding}" stroke="rgba(255,255,255,0.15)"/>
        <text x="12" y="${height - padding + 4}" fill="rgba(255,255,255,0.4)" font-size="10">0%</text>

        <!-- Area Fill -->
        <path d="${areaD}" fill="url(#chartGrad)"/>

        <!-- Trend Line -->
        <path d="${pathD}" fill="none" stroke="#10b981" stroke-width="3" stroke-linecap="round"/>

        <!-- Data Points & Labels -->
        ${coords.map(pt => `
          <circle cx="${pt.x}" cy="${pt.y}" r="5" fill="#0f172a" stroke="#10b981" stroke-width="2.5"/>
          <text x="${pt.x}" y="${pt.y - 10}" text-anchor="middle" fill="#f8fafc" font-size="10" font-weight="600">${pt.val}%</text>
        `).join('')}
      </svg>
    `;
  },

  /**
   * Generate subject performance horizontal bars
   */
  generateSubjectBars(stats) {
    if (!stats || Object.keys(stats).length === 0) {
      return `
        <div class="an-empty-chart">
          <span>Complete tests covering different subjects to display mastery metrics.</span>
        </div>
      `;
    }

    return Object.entries(stats).map(([subject, data]) => {
      const pct = Math.round((data.correct / data.answered) * 100);
      let colorClass = "bar-high";
      if (pct < 50) colorClass = "bar-low";
      else if (pct < 70) colorClass = "bar-mid";

      return `
        <div class="an-subject-bar-row">
          <div class="an-sb-header">
            <span class="an-sb-name">${subject}</span>
            <span class="an-sb-val">${data.correct}/${data.answered} (${pct}%)</span>
          </div>
          <div class="an-sb-track">
            <div class="an-sb-fill ${colorClass}" style="width: ${pct}%"></div>
          </div>
        </div>
      `;
    }).join('');
  }
};
