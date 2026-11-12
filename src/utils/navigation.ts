export const freePagePath = "/free-feed";

export function isFreePage(pathname: string) {
  return pathname.startsWith(freePagePath);
}

export function goDonate() {
  const section = document.getElementById("donate");
  if (section) section.scrollIntoView({ behavior: "smooth" });
  else window.location.href = "/#donate";
}
