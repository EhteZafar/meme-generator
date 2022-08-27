const imageFile = document.querySelector("#imageFile");
const topLine = document.querySelector("#topLine");
const bottomLine = document.querySelector("#bottomLine");
const canvas = document.querySelector("#meme");

let image;

imageFile.addEventListener("change", () => {
  const imgURL = URL.createObjectURL(imageFile.files[0]);

  // console.log(imgURL);

  image = new Image();
  image.src = imgURL;

  image.addEventListener("load", () => {
    updateCanvas(canvas, image, topLine.value, bottomLine.value);
  }, {once: true});
});

topLine.addEventListener("change", () => {
  updateCanvas(canvas, image, topLine.value, bottomLine.value);
});

bottomLine.addEventListener("change", () => {
  updateCanvas(canvas, image, topLine.value, bottomLine.value);
});

function updateCanvas(canvas, image, topText, bottomText) {
  const dis = canvas.getContext("2d");
  const width = image.width;
  const height = image.height;
  const fontSize = Math.floor(width/15);
  const yOffSet = height / 25;

  canvas.width = width;
  canvas.height = height;
  dis.drawImage(image, 0, 0);

  dis.strokeStyle = "black";
  dis.lineWidth = Math.floor(fontSize/4);
  dis.fillStyle = "white";
  dis.textAlign = "center";
  dis.lineJoin = "round";
  dis.font = `${fontSize}px san-serif`;

  dis.textBaseline = "top";
  dis.strokeText(topText, width / 2, yOffSet);
  dis.fillText(topText, width/2, yOffSet);

  dis.textBaseline = "bottom";
  dis.strokeText(bottomText, width / 2,height - yOffSet);
  dis.fillText(bottomText, width/2,height - yOffSet);

  document.getElementById("heading").innerHTML = "MEME";
  document.getElementById("download").innerHTML = "Download";

}

function download() {
  const imageLink = document.createElement('a');
  imageLink.download = 'meme.png';
  imageLink.href = canvas.toDataURL('image/png', 1);

  imageLink.click();
}
