/*** DECLARATION DE LA CLASSE DRUMKIT ***/
class Drumkit {
    /* DECLARATION DE LA FONCTION CONSTRUCTOR QUI VA CREER UN OBJET DRUMKIT */
    constructor() {
      this.pads = document.querySelectorAll(".pad");
      this.selects = document.querySelectorAll("select");
      this.playBtn = document.querySelector(".play");
      this.muteBtns = document.querySelectorAll(".mute");
      this.tempoSlider = document.querySelector(".tempo-slider");
      this.currentKick = "./allSounds/kick-808.wav";

      this.kickAudio = document.querySelector(".kick-sound");

      this.index = 0;
      this.bpm = 130;
      this.isPlaying = null;
    }
  
    /* METHODE PERMETTANT L'AJOUT OU LE RETRAIT DE LA CLASSE CSS "ACTIVE" */
    activePad() {
      this.classList.toggle("active");
    }
  
    /* METHODE PERMETTANT LA REPETITION EN BOUCLE DE L'ANIMATION DES PADS ET DE LA LECTURE DES LIGNES DE SAMPLES */
    repeat() {
      let step = this.index % 8;
      const activeBars = document.querySelectorAll(`.B${step}`);
      /* Loop over on the pads */
      activeBars.forEach((bar) => {
        bar.style.animation = `playTrack 0.35s alternate ease-in-out 2`;
        /* Check if pads are active */
        if (bar.classList.contains("active")) {
          /* Check each audio */
          if (bar.classList.contains("kick-pad")) {
            this.kickAudio.currentTime = 0;
            this.kickAudio.play();
          }
        }
      });
      this.index++;
    }
  
    /* Méthode lancée à chaque "clic" sur le bouton "PLAY" permettant le lancement de la méthode Repeat ou son Arrêt */
    start() {
      /* réglage du Tempo */
      const interval = (60 / this.bpm) * 1000;
      /* Si "this.isPlaying" = null */
      if (this.isPlaying == null) {
        /* change le text du Btn avec "STOP" */
        this.playBtn.innerText = "STOP";
        /* ajoute la classe "active" au bouton */
        this.playBtn.classList.add("active");
        /* donne une valeur à "this.isPlaying" */
        this.isPlaying = setInterval(
          () => {
            /* lance la fonction "repeat()" */
            this.repeat();
          },
          /* relance la fonction repeat() tous les "interval" millisecondes */
          interval
        );
      } else {
        /* sinon */
        /* change le text du Btn par "PLAY" */
        this.playBtn.innerText = "PLAY";
        /* efface la classe "active" du bouton */
        this.playBtn.classList.remove("active");
        /* efface la valeur de "this.isPlaying" */
        clearInterval(this.isPlaying);
        /* attribut la valeur "null" à (this.isPlaying) */
        this.isPlaying = null;
      }
    }
  
    /* Méthode permettant de choisir et valider le choix d'un sample dans la liste contenue dans chaque "SELECT" */
    changeSample(e) {
      const selectionName = e.target.name;
      const selectionValue = e.target.value;
      switch (selectionName) {
        case "kick-select":
          this.kickAudio.src = selectionValue;
          break;
      }
    }
  
    /* Méthode permettant de mettre à jour l'affichage du tempo en fonction de la barre de slide */
    changeTempo(e) {
      const tempoText = document.querySelector(".tempo-nr");
      tempoText.innerText = e.target.value;
      console.log(tempoText.innerText);
    }
  
    /* Méthode permettant de mettre à jour dans l'objet Drumkit la propriété "Bpm" */
    updateInterval(e) {
      this.bpm = e.target.value;
      clearInterval(this.isPlaying);
      this.isPlaying = null;
      const playBtn = document.querySelector(".play");
      if (playBtn.classList.contains("active")) {
        this.start();
      }
    }
  
    /* Méthode permettant d'activer ou désactiver le bouton "MUTE" */
    mute(e) {
      const muteIndex = e.target.getAttribute("data-sample");
      e.target.classList.toggle("active");
      if (e.target.classList.contains("active")) {
        switch (muteIndex) {
          case "0":
            this.kickAudio.volume = 0;
            break;
        }
      } else {
        switch (muteIndex) {
          case "0":
            this.kickAudio.volume = 1;
            break;
      }
    }
  }
}
  
  const drumKit = new Drumkit();
  
  /* EVENT LISTENERS */
  /* EventListener qui s'active lors d'un click sur un pad */
  drumKit.pads.forEach((pad) => {
    pad.addEventListener("click", drumKit.activePad);
    pad.addEventListener("animationend", function () {
      this.style.animation = "";
    });
  });
  
  /* EventListener qui s'active lors d'un click sur le bouton "PLAY" */
  drumKit.playBtn.addEventListener("click", function () {
    drumKit.start();
  });
  
  /* EventListener qui s'active lors du changement de valeur d'un "SELECT" */
  drumKit.selects.forEach((select) => {
    select.addEventListener("change", function (e) {
      drumKit.changeSample(e);
    });
  });
  
  /* EventListener qui s'active lors d'un click sur un bouton "MUTE" */
  drumKit.muteBtns.forEach((btn) => {
    btn.addEventListener("click", function (e) {
      drumKit.mute(e);
    });
  });
  
  /* EventListener positionné sur le "tempoSlider" qui s'active lors du changement de valeur de "INPUT" */
  drumKit.tempoSlider.addEventListener("input", function (e) {
    drumKit.changeTempo(e);
  });
  
  /* EventListener positionné sur le "tempoSlider" qui s'active lors du changement de position du Slider */
  drumKit.tempoSlider.addEventListener("change", function (e) {
    drumKit.updateInterval(e);
  });