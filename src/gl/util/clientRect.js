// fix scroll value based on picked boilerplate

export const clientRect = (element) => {
  const bounds = element.getBoundingClientRect();

  let scroll = 0;
  scroll = window.app?.scroll?.y || window.pageYOffset;

  return {
    bottom: bounds.bottom + scroll,
    height: bounds.height,
    left: bounds.left,
    right: bounds.right,
    top: bounds.top + scroll,
    width: bounds.width,
    wh: window.innerHeight,
    center: bounds.top + scroll + bounds.height / 2,
    // ww: window.innerWidth,
    // offset: bounds.top + scroll,
  };
};

export const clientRectGl = (element, ratio) => {
  const { bottom, height, top, wh, left, right, center, width } =
    clientRect(element);

  // element.style.border = "1px solid red";

  return {
    bottom: bottom * ratio,
    height: height * ratio,
    top: top * ratio,
    wh: wh * ratio,
    left: left * ratio,
    right: right * ratio,
    center: center * ratio,
    width: width * ratio,
  };
};
