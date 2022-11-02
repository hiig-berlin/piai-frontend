export const scrollToHash = (hash: string) => {
  if (typeof document === undefined) return;

  if (hash.indexOf('#') > -1) {
    let anchor = document.location.hash.replace('#!', "");
    anchor = anchor.replace("#","");

    const target: HTMLElement | null = document.getElementById(anchor);
    const header: HTMLDivElement | null =  document.querySelector(".header");

    let adjust = -30;
    if (header) {
      adjust = header.offsetHeight * -1;
    }

    if (target) {
      window.scrollTo({
        top: target.offsetTop + adjust,
        behavior: "smooth",
      });
    }
  }
}