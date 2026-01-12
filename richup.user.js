// ==UserScript==
// @name         RichUp Auto Buy + Roll + End Turn + Decline
// @namespace    https://richup.io/
// @version      1.2.0
// @description  Auto Buy property, Decline trade, End Turn, dan Roll
// @match        https://richup.io/room/*
// @grant        none
// ==/UserScript==

(function () {
  'use strict';

  let auto = true; // OFF jika perlu

  function norm(t) {
    return t.toLowerCase().replace(/\s+/g, " ");
  }

  function findButton(keyword) {
    return [...document.querySelectorAll("button")]
      .find(b => !b.disabled && norm(b.innerText).includes(keyword)) || null;
  }

  function loop() {
    if (!auto) return;

    // 1) BUY (property purchase)
    const buyBtn = findButton("buy");
    if (buyBtn) {
      buyBtn.click();
      setTimeout(loop, 1100);
      return;
    }

    // 2) TRADE → Decline
    const declineBtn = findButton("decline");
    if (declineBtn) {
      declineBtn.click();
      setTimeout(loop, 1100);
      return;
    }

    // 3) END TURN
    const endBtn = findButton("end");
    if (endBtn) {
      endBtn.click();
      setTimeout(loop, 1100);
      return;
    }

    // 4) ROLL
    const rollBtn = findButton("roll");
    if (rollBtn) {
      rollBtn.click();
      setTimeout(loop, 900);
      return;
    }

    // 5) Tiada apa-apa → tunggu
    setTimeout(loop, 900);
  }

  // mula selepas page stabil
  setTimeout(loop, 3000);

  // kawalan manual
  window.richupAuto = {
    start() { auto = true; loop(); },
    stop() { auto = false; }
  };
})();
