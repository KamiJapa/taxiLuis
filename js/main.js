const menuButton = document.querySelector(".menu-toggle");
const mainNav = document.querySelector("#main-nav");

if (menuButton && mainNav) {
  const closeMenu = () => {
    menuButton.setAttribute("aria-expanded", "false");
    menuButton.setAttribute("aria-label", "Abrir menu");
    mainNav.classList.remove("is-open");
  };

  menuButton.addEventListener("click", () => {
    const open = menuButton.getAttribute("aria-expanded") !== "true";
    menuButton.setAttribute("aria-expanded", String(open));
    menuButton.setAttribute("aria-label", open ? "Fechar menu" : "Abrir menu");
    mainNav.classList.toggle("is-open", open);
  });
  mainNav.querySelectorAll("a").forEach((link) => link.addEventListener("click", closeMenu));
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeMenu();
  });
  document.addEventListener("click", (event) => {
    if (!mainNav.contains(event.target) && !menuButton.contains(event.target)) closeMenu();
  });
}

const form = document.querySelector("#trip-form");
if (form) {
  const steps = [...form.querySelectorAll(".planner-step")];
  const progressSteps = [...document.querySelectorAll(".progress-step")];
  const serviceInputs = [...form.querySelectorAll('input[name="service"]')];
  const roundTrip = form.elements.roundTrip;
  const returnFields = document.querySelector("#return-fields");
  const airportFields = document.querySelector("#airport-fields");
  const messageField = document.querySelector("#message");
  const summary = document.querySelector("#review-summary");
  const editedStatus = document.querySelector("#message-edited");
  const formState = () => {
    const state = Object.fromEntries(new FormData(form).entries());
    delete state.message;
    return JSON.stringify(state);
  };
  const value = (name) => String(form.elements[name]?.value || "").trim();
  let currentStep = 1;
  let originalMessage = "";
  let originalState = "";
  let messageIsEdited = false;

  const formatDate = (date) => {
    if (!date) return "";
    const parts = date.split("-");
    return parts.length === 3 ? parts[2] + "/" + parts[1] + "/" + parts[0] : date;
  };

  const updateConditions = () => {
    const airport = value("service").toLowerCase().includes("aeroporto");
    returnFields.hidden = !roundTrip.checked;
    airportFields.hidden = !airport;
    form.elements.returnDate.required = false;
    form.elements.returnTime.required = false;
    if (!roundTrip.checked) {
      form.elements.returnDate.value = "";
      form.elements.returnTime.value = "";
    }
    if (!airport) form.elements.flight.value = "";
  };

  const setDateLimits = () => {
    const now = new Date();
    const today = [now.getFullYear(), String(now.getMonth() + 1).padStart(2, "0"), String(now.getDate()).padStart(2, "0")].join("-");
    form.elements.travelDate.min = today;
    form.elements.returnDate.min = value("travelDate") || today;
  };

  const setStep = (step) => {
    currentStep = step;
    steps.forEach((section) => {
      const active = Number(section.dataset.step) === step;
      section.hidden = !active;
      section.classList.toggle("is-current", active);
    });
    progressSteps.forEach((item) => {
      const number = Number(item.dataset.progress);
      item.classList.toggle("is-active", number === step);
      item.classList.toggle("is-complete", number < step);
      if (number === step) item.setAttribute("aria-current", "step");
      else item.removeAttribute("aria-current");
    });
    const title = steps[step - 1].querySelector("h3");
    title?.setAttribute("tabindex", "-1");
    title?.focus({ preventScroll: true });
  };

  const clearErrors = () => {
    form.querySelectorAll('[aria-invalid="true"]').forEach((field) => field.removeAttribute("aria-invalid"));
    form.querySelectorAll(".field-error").forEach((error) => { if (error.id !== "service-error") error.hidden = true; });
    document.querySelector("#trip-error").hidden = true;
    document.querySelector("#service-error").hidden = true;
  };

  const validateService = () => {
    const selected = form.querySelector('input[name="service"]:checked');
    const error = document.querySelector("#service-error");
    error.hidden = Boolean(selected);
    if (!selected) form.querySelector(".choice-card input")?.focus();
    return Boolean(selected);
  };

  const showFieldError = (field, message) => {
    const error = form.querySelector('[data-error-for="' + field.name + '"]');
    field.setAttribute("aria-invalid", "true");
    if (error) {
      error.textContent = message;
      error.hidden = false;
    }
  };

  const validateTrip = () => {
    clearErrors();
    const required = [
      [form.elements.origin, "Informe o local de partida."],
      [form.elements.destination, "Informe o destino."],
      [form.elements.travelDate, "Escolha uma data de hoje em diante."],
      [form.elements.travelTime, "Informe um horário válido."]
    ];
    const today = new Date();
    const todayString = [
      today.getFullYear(),
      String(today.getMonth() + 1).padStart(2, "0"),
      String(today.getDate()).padStart(2, "0")
    ].join("-");
    const travelDate = value("travelDate");
    const nowTime = String(today.getHours()).padStart(2, "0") + ":" + String(today.getMinutes()).padStart(2, "0");
    const invalid = [];
    required.forEach(([field, message]) => {
      const empty = !String(field.value || "").trim();
      const pastDate = field.name === "travelDate" && travelDate && travelDate < todayString;
      const pastTimeToday = field.name === "travelTime" && travelDate === todayString && value("travelTime") && value("travelTime") < nowTime;
      if (empty || pastDate || pastTimeToday) {
        showFieldError(field, message);
        invalid.push(field);
      }
    });

    if (roundTrip.checked && value("returnDate") && value("travelDate") && value("returnDate") < value("travelDate")) {
      showFieldError(form.elements.returnDate, "A data de retorno não pode ser anterior à ida.");
      invalid.push(form.elements.returnDate);
    }
    if (roundTrip.checked && value("returnDate") === value("travelDate") && value("returnTime") && value("travelTime") && value("returnTime") < value("travelTime")) {
      showFieldError(form.elements.returnTime, "O horário de retorno deve ser posterior ao horário de ida.");
      invalid.push(form.elements.returnTime);
    }

    if (invalid.length) {
      document.querySelector("#trip-error").hidden = false;
      invalid[0].focus();
      return false;
    }
    return true;
  };

  const getMessage = () => {
    const service = value("service");
    const lines = [
      "Olá, Luís! Gostaria de solicitar um orçamento.",
      "",
      "Serviço: " + service,
      "Origem: " + value("origin"),
      "Destino: " + value("destination"),
      "Data: " + formatDate(value("travelDate")),
      "Horário: " + value("travelTime")
    ];
    if (value("passengers")) lines.push("Passageiros: " + value("passengers"));
    if (roundTrip.checked) {
      lines.push("Viagem de ida e volta: sim");
      if (value("returnDate")) lines.push("Data de retorno: " + formatDate(value("returnDate")));
      if (value("returnTime")) lines.push("Horário de retorno: " + value("returnTime"));
    }
    if (value("flight")) lines.push("Voo/companhia/terminal: " + value("flight"));
    if (value("notes")) lines.push("Observações: " + value("notes"));
    lines.push("", "Aguardo seu retorno sobre disponibilidade e valores. Obrigado(a)!");
    return lines.join("\n");
  };

  const renderSummary = () => {
    const items = [
      ["Serviço", value("service")],
      ["Origem", value("origin")],
      ["Destino", value("destination")],
      ["Data e horário", formatDate(value("travelDate")) + " · " + value("travelTime")],
      ["Passageiros", value("passengers") || "Não informado"]
    ];
    if (roundTrip.checked) {
      const returnText = [formatDate(value("returnDate")), value("returnTime")].filter(Boolean).join(" · ");
      items.push(["Retorno", returnText || "A combinar"]);
    }
    if (value("flight")) items.push(["Voo / companhia", value("flight")]);
    summary.replaceChildren(...items.map(([label, text]) => {
      const item = document.createElement("div");
      item.className = "review-item";
      const heading = document.createElement("span");
      heading.textContent = label;
      const content = document.createElement("strong");
      content.textContent = text;
      item.append(heading, content);
      return item;
    }));
  };

  const reviewTrip = () => {
    const currentState = formState();
    if (messageIsEdited && originalState && currentState !== originalState) {
      const updateMessage = window.confirm("Os dados da viagem mudaram. Se continuar, o texto editado será atualizado com os dados mais recentes. Se escolher Cancelar, sua edição será mantida. Deseja atualizar a mensagem?");
      if (updateMessage) {
        originalMessage = getMessage();
        messageField.value = originalMessage;
        messageIsEdited = false;
        editedStatus.textContent = "";
      }
    } else if (!messageIsEdited || !originalMessage) {
      originalMessage = getMessage();
      messageField.value = originalMessage;
      editedStatus.textContent = "";
    }
    originalState = currentState;
    renderSummary();
    setStep(3);
  };

  form.addEventListener("change", (event) => {
    if (event.target.name === "service" || event.target.name === "roundTrip") updateConditions();
    if (event.target.name === "travelDate") setDateLimits();
  });
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    if (currentStep === 1 && validateService()) setStep(2);
    else if (currentStep === 2 && validateTrip()) reviewTrip();
  });
  document.querySelectorAll("[data-next]").forEach((button) => {
    button.addEventListener("click", () => {
      if (currentStep === 1) {
        if (validateService()) {
          clearErrors();
          updateConditions();
          setStep(2);
        }
      } else if (currentStep === 2 && validateTrip()) {
        reviewTrip();
      }
    });
  });
  document.querySelectorAll("[data-back]").forEach((button) => button.addEventListener("click", () => {
    clearErrors();
    setStep(Math.max(1, currentStep - 1));
  }));

  messageField.addEventListener("input", () => {
    messageIsEdited = messageField.value !== originalMessage;
    editedStatus.textContent = messageIsEdited ? "Mensagem personalizada" : "";
  });
  document.querySelector("#restore-message").addEventListener("click", () => {
    originalMessage = getMessage();
    originalState = formState();
    messageField.value = originalMessage;
    messageIsEdited = false;
    editedStatus.textContent = "Mensagem original restaurada.";
    messageField.focus();
  });
  document.querySelector("#send-whatsapp").addEventListener("click", () => {
    const text = messageField.value.trim();
    if (!text) {
      messageField.focus();
      return;
    }
    const url = "https://wa.me/5517988285557?text=" + encodeURIComponent(text);
    window.open(url, "_blank", "noopener,noreferrer");
  });

  document.querySelectorAll("[data-prefill]").forEach((link) => link.addEventListener("click", () => {
    const mapping = {
      urbana: "Corrida urbana",
      aeroporto: "Transfer para aeroporto",
      intermunicipal: "Viagem intermunicipal",
      executivo: "Transporte executivo ou empresarial",
      particular: "Outro serviço",
      outro: "Outro serviço"
    };
    const desired = mapping[link.dataset.prefill];
    const option = serviceInputs.find((input) => input.value === desired);
    if (option) {
      option.checked = true;
      updateConditions();
      document.querySelectorAll(".choice-card").forEach((card) => card.classList.toggle("is-selected", card.contains(option)));
    }
  }));

  serviceInputs.forEach((input) => input.addEventListener("change", () => {
    document.querySelectorAll(".choice-card").forEach((card) => card.classList.toggle("is-selected", card.contains(input) && input.checked));
  }));

  updateConditions();
}

  setDateLimits();
const year = document.querySelector("#current-year");
if (year) year.textContent = new Date().getFullYear();
