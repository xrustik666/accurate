function scrollToArchive() {
  var element = document.querySelector('.archive-results');

  element.scrollIntoView({
    behavior: "smooth",
    block: "start",
    inline: "nearest"
  });
}

export { scrollToArchive };