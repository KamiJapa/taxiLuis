window.__auditConfirm = (message) => {
  document.documentElement.dataset.auditConfirmMessage = message;
  document.documentElement.dataset.auditConfirmAnswer = new URLSearchParams(window.location.search).get("confirm") === "yes" ? "yes" : "no";
  return document.documentElement.dataset.auditConfirmAnswer === "yes";
};
window.__auditOpen = (url, target, features) => {
  document.documentElement.dataset.auditOpenedUrl = url;
  document.documentElement.dataset.auditOpenedTarget = target;
  document.documentElement.dataset.auditOpenedFeatures = features;
  return null;
};
