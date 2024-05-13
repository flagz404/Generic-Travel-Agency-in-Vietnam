window.addEventListener("resize", () => {
    const width = window.innerWidth;
    const height = window.innerHeight;

    console.log(`The viewport's width is ${width} and the height is ${height}.`);

    let width1 = width / 2;
    let height1 = height / 2;

    document.getElementById("img2-container").style.width = width1;
});