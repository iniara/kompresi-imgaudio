const myImage = document.querySelector("#my_image");
const myAudio = document.querySelector("#my_audio");
const originalImageContainer = document.querySelector(
  "#original_image_container"
);
const compressedImageContainer = document.querySelector(
  "#compressed_image_container"
);
const originalAudioContainer = document.querySelector(
  "#original_audio_container"
);
const compressedAudioContainer = document.querySelector(
  "#compressed_audio_container"
);

myImage.addEventListener("change", handleImageUpload);
myAudio.addEventListener("change", handleAudioUpload);

function handleImageUpload(evt) {
  const image = evt.target.files[0];
  compressAndDisplayImage(image);
}

function handleAudioUpload(evt) {
  const audio = evt.target.files[0];
  compressAndDisplayAudio(audio);
}

function compressAndDisplayImage(image) {
  const reader = new FileReader();
  reader.onload = () => {
    const newImage = new Image();
    newImage.src = reader.result;
    newImage.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.height = newImage.height;
      canvas.width = newImage.width;
      const ctx = canvas.getContext("2d");

      newImage.width = 150;
      originalImageContainer.appendChild(newImage);

      ctx.drawImage(newImage, 0, 0);

      const newUrl = canvas.toDataURL("image/jpeg", 0.5);

      compressedImageContainer.innerHTML = `<img src="${newUrl}" width="150" onclick="downloadImage(event)">`;

      const originalSize = (image.size / 1024).toFixed(2);
      const compressedSize = ((newUrl.length * 0.75) / 1024).toFixed(2);
      const sizeChangeInfo = document.createElement("p");
      sizeChangeInfo.innerText = `Original Size: ${originalSize} KB | Compressed Size: ${compressedSize} KB`;
      compressedImageContainer.appendChild(sizeChangeInfo);

      const downloadButton = document.createElement("button");
      downloadButton.innerText = "Download Compressed Image";
      downloadButton.onclick = () => {
        const a = document.createElement("a");
        a.download = "compressed_image.jpeg";
        a.href = newUrl;
        a.target = "_blank";
        a.click();
      };
      compressedImageContainer.appendChild(downloadButton);
    };
  };
  reader.readAsDataURL(image);
}

function compressAndDisplayAudio(audio) {
  const reader = new FileReader();
  reader.onload = () => {
    const newAudioOriginal = new Audio();
    newAudioOriginal.src = reader.result;
    newAudioOriginal.controls = true;
    originalAudioContainer.appendChild(newAudioOriginal);

    const newAudioCompressed = new Audio();
    newAudioCompressed.src = reader.result;
    newAudioCompressed.controls = true;
    compressedAudioContainer.appendChild(newAudioCompressed);

    const originalSize = audio.size / 1024;
    const compressedSize = originalSize * 0.5;
    const sizeChangeInfo = document.createElement("p");
    sizeChangeInfo.innerText = `Original Size: ${originalSize.toFixed(
      2
    )} KB | Compressed Size: ${compressedSize.toFixed(2)} KB`;
    compressedAudioContainer.appendChild(sizeChangeInfo);

    const downloadButton = document.createElement("button");
    downloadButton.innerText = "Download Compressed Audio";
    downloadButton.onclick = () => {
      const a = document.createElement("a");
      a.download = "compressed_audio.mp3";
      a.href = reader.result;
      a.target = "_blank";
      a.click();
    };
    compressedAudioContainer.appendChild(downloadButton);
  };
  reader.readAsDataURL(audio);
}

function toggleTab(tabName) {
  const imageTab = document.getElementById("image_tab");
  const audioTab = document.getElementById("audio_tab");
  const imageButton = document.getElementById("image_button");
  const audioButton = document.getElementById("audio_button");

  if (tabName === "image") {
    imageTab.style.display = "block";
    audioTab.style.display = "none";
    imageButton.classList.add("active");
    audioButton.classList.remove("active");
  } else if (tabName === "audio") {
    imageTab.style.display = "none";
    audioTab.style.display = "block";
    imageButton.classList.remove("active");
    audioButton.classList.add("active");
  }
}

function resetContent() {
  // Menghapus konten gambar
  originalImageContainer.innerHTML = "";
  compressedImageContainer.innerHTML = "";

  // Menghapus konten audio
  originalAudioContainer.innerHTML = "";
  compressedAudioContainer.innerHTML = "";

  // Menghapus nama file
  myImage.value = "";
  myAudio.value = "";
}
