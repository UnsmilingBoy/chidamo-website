let month = new Date().getMonth();
month = 5; //For test

export function primaryColor() {
  if (month >= 2 && month <= 4) {
    return "#358838"; // Spring (March - May)
  } else if (month >= 5 && month <= 7) {
    return "#007A78"; // Summer (June - August)
  } else if (month >= 8 && month <= 10) {
    return "#8c311c"; // Fall (September - November)
  } else {
    return "#2E5077"; // Winter (December - February)
  }
}
export function footerColor() {
  if (month >= 2 && month <= 4) {
    return "#19401A"; // Spring (March - May)
  } else if (month >= 5 && month <= 7) {
    return "#00403F"; // Summer (June - August)
  } else if (month >= 8 && month <= 10) {
    return "#40160D"; // Fall (September - November)
  } else {
    return "#192B40"; // Winter (December - February)
  }
}

export function productPageLightPrimaryColor() {
  if (month >= 2 && month <= 4) {
    return "#F5FFF5"; // Spring (March - May)
  } else if (month >= 5 && month <= 7) {
    return "#F5FFFF"; // Summer (June - August)
  } else if (month >= 8 && month <= 10) {
    return "#FFF7F5"; // Fall (September - November)
  } else {
    return "#F5FAFF"; // Winter (December - February)
  }
}

export function logoPicker() {
  if (month >= 2 && month <= 4) {
    return "/images/spring-logo.svg"; // Spring (March - May)
  } else if (month >= 5 && month <= 7) {
    return "/images/summer-2-logo.svg"; // Summer (June - August)
  } else if (month >= 8 && month <= 10) {
    return "/images/autumn-logo.svg"; // Fall (September - November)
  } else {
    return "/images/winter-logo.svg"; // Winter (December - February)
  }
}

export function chLogoPicker() {
  if (month >= 2 && month <= 4) {
    return "/images/ch-logo-spring.svg"; // Spring (March - May)
  } else if (month >= 5 && month <= 7) {
    return "/images/ch-logo-summer.svg"; // Summer (June - August)
  } else if (month >= 8 && month <= 10) {
    return "/images/ch-logo-fall.svg"; // Fall (September - November)
  } else {
    return "/images/ch-logo-winter.svg"; // Winter (December - February)
  }
}

export function currentSeason() {
  if (month >= 2 && month <= 4) {
    return "spring"; // Spring (March - May)
  } else if (month >= 5 && month <= 7) {
    return "summer"; // Summer (June - August)
  } else if (month >= 8 && month <= 10) {
    return "autumn"; // Fall (September - November)
  } else {
    return "winter"; // Winter (December - February)
  }
}
