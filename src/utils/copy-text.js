export async function copyText(text) {
  try {
    await navigator.clipboard.writeText(text);
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error("Failed to copy: ", err);
  }
}
