const artist = document.querySelector(".artistName").innerHTML;
const track = document.querySelector(".trackName").innerHTML;
console.log(artist)
console.log(track)

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
      this.currentClap = "./allSounds/clap-808.wav";
      this.currentCrash = "./allSounds/crash-808.wav";
      this.currentHihat = "./allSounds/Hihat-808.wav";
      this.currentOpenhat = "./allSounds/openhat-808.wav";
      this.currentPerc = "./allSounds/perc-808.wav";
      this.currentSnare = "./allSounds/snare-808.wav";
      this.currentTom = "./allSounds/tom-808.wav";
      this.currentOther = "./allSounds/cowbell-808.wav";
      this.kickAudio = document.querySelector(".kick-sound");
      this.clapAudio = document.querySelector(".clap-sound");
      this.crashAudio = document.querySelector(".crash-sound");
      this.hihatAudio = document.querySelector(".hihat-sound");
      this.openhatAudio = document.querySelector(".openhat-sound");
      this.percAudio = document.querySelector(".perc-sound");
      this.snareAudio = document.querySelector(".snare-sound");
      this.tomAudio = document.querySelector(".tom-sound");
      this.otherAudio = document.querySelector(".other-sound");
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
          if (bar.classList.contains("clap-pad")) {
            this.clapAudio.currentTime = 0;
            this.clapAudio.play();
          }
          if (bar.classList.contains("crash-pad")) {
            this.crashAudio.currentTime = 0;
            this.crashAudio.play();
          }
          if (bar.classList.contains("hihat-pad")) {
            this.hihatAudio.currentTime = 0;
            this.hihatAudio.play();
          }
          if (bar.classList.contains("openhat-pad")) {
            this.openhatAudio.currentTime = 0;
            this.openhatAudio.play();
          }
          if (bar.classList.contains("perc-pad")) {
            this.percAudio.currentTime = 0;
            this.percAudio.play();
          }
          if (bar.classList.contains("snare-pad")) {
            this.snareAudio.currentTime = 0;
            this.snareAudio.play();
          }
          if (bar.classList.contains("tom-pad")) {
            this.tomAudio.currentTime = 0;
            this.tomAudio.play();
          }
          if (bar.classList.contains("other-pad")) {
            this.otherAudio.currentTime = 0;
            this.otherAudio.play();
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
        case "clap-select":
          this.clapAudio.src = selectionValue;
          break;
        case "crash-select":
          this.crashAudio.src = selectionValue;
          break;
        case "hihat-select":
          this.hihatAudio.src = selectionValue;
          break;
        case "openhat-select":
          this.openhatAudio.src = selectionValue;
          break;
        case "perc-select":
          this.percAudio.src = selectionValue;
          break;
        case "snare-select":
          this.snareAudio.src = selectionValue;
          break;
        case "tom-select":
          this.tomAudio.src = selectionValue;
          break;
        case "other-select":
          this.otherAudio.src = selectionValue;
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
          case "1":
            this.clapAudio.volume = 0;
            break;
          case "2":
            this.crashAudio.volume = 0;
            break;
          case "3":
            this.hihatAudio.volume = 0;
            break;
          case "4":
            this.openhatAudio.volume = 0;
            break;
          case "5":
            this.percAudio.volume = 0;
            break;
          case "6":
            this.snareAudio.volume = 0;
            break;
          case "7":
            this.tomAudio.volume = 0;
            break;
          case "8":
            this.otherAudio.volume = 0;
            break;
        }
      } else {
        switch (muteIndex) {
          case "0":
            this.kickAudio.volume = 1;
            break;
          case "1":
            this.clapAudio.volume = 1;
            break;
          case "2":
            this.crashAudio.volume = 1;
            break;
          case "3":
            this.hihatAudio.volume = 1;
            break;
          case "4":
            this.openhatAudio.volume = 1;
            break;
          case "5":
            this.percAudio.volume = 1;
            break;
          case "6":
            this.snareAudio.volume = 1;
            break;
          case "7":
            this.tomAudio.volume = 1;
            break;
          case "8":
            this.otherAudio.volume = 1;
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