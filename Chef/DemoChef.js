
window.onload = function start(){
    window.addEventListener("pointerdown", PointerCe);
    window.addEventListener("pointermove", PointerMove);
    window.addEventListener("pointerup", PointerPec);
    window.addEventListener("pointercancel", PointerPec);

    CpacCe();

    let v = vBox.children[0];
    v.style.fontSize = `${Math.round(vBoxCpac.height)}px`;

    let b = bBox.children[0];
    b.style.fontSize = `${Math.round(bBoxCpac.height)}px`;

    BynCe();

    ViBerCe();

    DrawCe();
}
  