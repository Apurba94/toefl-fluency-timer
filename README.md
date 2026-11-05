# Fluency Timer

Speak on a topic for 45 seconds without stopping, record it, and track your fluency.

Part of the [GRE and TOEFL Study Suite](https://github.com/Apurba94/gre-toefl-study-suite): 100 free study apps for the TOEFL iBT and more. It works offline, as a Windows program or in the browser.

## Download and run

- **Windows:** download `Fluency Timer.exe` from the [latest release](https://github.com/Apurba94/toefl-fluency-timer/releases/latest) and open it. Nothing to install. It opens in its own window and saves your progress in your user folder.
- **Browser:** open it online in the suite's web edition at https://gre-toefl-study-suite.vercel.app/apps/toefl-fluency-timer/ . Progress stays in that browser.
- **From source:** `python launcher.py` (Python 3.10 or later, no packages needed).

## What it does

Fluency means keeping going. Get a random topic, speak about it for 45 seconds without stopping, and record yourself. Then listen back and count your long pauses and filler words such as um and uh. Over time the chart should show fewer of both.

Sections: Practice, Progress, About.

## How to use it

1. Press **New topic** in **Practice**. Take 15 seconds to think.
2. Record for 45 seconds. Do not stop, even if you make mistakes.
3. Listen back and enter your counts honestly. The score is a self-check, not a TOEFL score.

## Good to know

- All questions, passages and definitions were written for this suite. None are official ETS questions. For official practice, use the materials on ets.org.
- It follows the GRE General Test as shortened in September 2023 and the TOEFL iBT as updated in January 2026. Formats change, so check ets.org before your test.
- Feedback on writing and speaking counts things a program can count honestly, such as length and linking words. It does not give an official score.
- Not endorsed by or affiliated with ETS. GRE and TOEFL are registered trademarks of ETS.

## For developers

The app is plain HTML and JavaScript in `web/`, run by a small Python launcher that serves it on 127.0.0.1 only and needs a secret token for saving. Tests: `node --test "tests/*.test.js"` (24 tests) and `python -m unittest discover -s tests`. Build the .exe with `python build_exe.py`.

Built with AI assistance (Claude Code). MIT licence. By JANIN A APURBA.
