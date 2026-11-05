/* Fluency Timer: speak on a topic for 45 seconds without stopping, record it, and track fluency. */
(function () {
  'use strict';
  const KEY = 'toefl-fluency-timer.log';
  // A simple fluency score from self-ratings: fewer long pauses and fillers, and finishing the time, score higher.
  const score = (r) => Math.max(0, 10 - 2 * r.pauses - r.fillers + (r.finished ? 2 : 0));
  const App = {
    about: 'Fluency means keeping going. Get a random topic, speak about it for 45 seconds without stopping, and record yourself. Then listen back and count your long pauses and filler words such as um and uh. Over time the chart should show fewer of both.',
    how: ['Press **New topic** in **Practice**. Take 15 seconds to think.', 'Record for 45 seconds. Do not stop, even if you make mistakes.', 'Listen back and enter your counts honestly. The score is a self-check, not a TOEFL score.'],
    tabs: [{ id: 'practice', label: 'Practice', render(el, ctx) {
      const topic = SK.pick(SK.rng(SK.seedNow()), ctx.data.speaking_topics);
      const r = { pauses: 0, fillers: 0, finished: true };
      const num = (k, label) => SK.field(label, SK.h('input', { type: 'number', min: 0, max: 30, value: 0, style: { width: '7ch' }, oninput: (e) => { r[k] = Math.max(0, Number(e.target.value) || 0); } }));
      const out = SK.h('div', {});
      el.appendChild(SK.card('Speak for 45 seconds', SK.h('div', { class: 'sk-passage', text: topic }), SK.btn('New topic', () => SK.show('practice'), 'ghost small'),
        SK.h('div', { style: { marginTop: '10px' } }, SK.recorder({ prep: 15, seconds: 45 })),
        SK.h('h3', { text: 'After you listen back' }), SK.h('div', { class: 'sk-row' }, num('pauses', 'Pauses over 3 seconds'), num('fillers', 'Fillers (um, uh, like)'), SK.select([['1', 'I kept going for 45 s'], ['0', 'I stopped early']], '1', (v) => { r.finished = v === '1'; }, 'Did you finish?')),
        SK.h('div', { style: { marginTop: '10px' } }, SK.btn('Save', () => {
          const log = SK.store.get(KEY, []); log.push({ day: SK.dayKey(), topic, ...r, score: score(r) }); SK.store.set(KEY, log.slice(-300));
          SK.logPractice(1.5, 'Fluency');
          SK.clear(out).appendChild(SK.note('Fluency self-score: ' + score(r) + ' out of 12.', 'info'));
        }, '', { 'data-auto': 'once' })), out));
      const log = SK.store.get(KEY, []);
      if (log.length) el.appendChild(SK.card('Your fluency over time', SK.chart.line(log.slice(-20).map((x) => ({ y: x.score, label: x.day })), { min: 0, max: 12, label: 'Fluency self-score' })));
    } }],
    score,
    checks: {
      'the self-score rewards fewer pauses and fillers': (data, assert) => { assert.equal(score({ pauses: 0, fillers: 0, finished: true }), 12); assert.ok(score({ pauses: 2, fillers: 3, finished: true }) < 12); assert.equal(score({ pauses: 9, fillers: 9, finished: false }), 0); },
      'there are enough topics': (data, assert) => { assert.ok(data.speaking_topics.length >= 25); },
    },
  };
  if (typeof module !== 'undefined' && module.exports) module.exports = App; else SK.start(App);
})();
