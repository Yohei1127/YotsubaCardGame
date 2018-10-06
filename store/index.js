
export const state = () => ({
  modalOption: false,
  clickedCards:[],
  openedCards: [], //表示カード
  deck: [],
  cleared: false,
  startGame: false,
});

export const getters = {

};

export const mutations = {
  setCards(state) {
    const deckCards = [];
    const marks = ["c", "d", "h", "s"];

    // カードセットの生成
    for (var i = 0; i<marks.length; i++){
      for (var j = 1; j<=13; j++){
        if (j !== 10){ //10は入れない
          const card = {
            mark: marks[i],
            num: j,
          }
          deckCards.push(card);
        }
      }
    }


    // カードセットのシャッフル
    for(var i = deckCards.length - 1; i > 0; i--){
      var r = Math.floor(Math.random() * (i + 1));
      var tmp = deckCards[i];
      deckCards[i] = deckCards[r];
      deckCards[r] = tmp;
    }

    // 初期表示カードの設定
    const cards = deckCards.splice(0, 16);
    state.openedCards = cards;

    // デッキの設定
    state.deck = deckCards;

  },
  addNum(state, n) {
    // タイマー表示
    state.startGame = true;

    // 既に同じカードを選んだら処理をスキップ
    const duplicated = state.clickedCards.find(el => el.mark === n.mark && el.num === n.num);
    // 最初のカード二重押しの場合はリセット。それ以外は反応させない
    !duplicated ? state.clickedCards.push(n):state.clickedCards.length === 1? state.clickedCards = []: '';

    const arry = [...state.openedCards];

    // 数字カード押した時の処理
    if (n.num < 11){
      //違う柄のカードを選んだ場合リセット
      const checkMark = state.clickedCards.find(el => el.mark != n.mark);
      checkMark ? state.clickedCards = [] : '';

      //J,Q,Kカードを既に押している場合リセット
      const checkNum = state.clickedCards.find(el => el.num > 10);
      checkNum ? state.clickedCards = [] : '';

      // 合計値が15より大きければ選んだカードをリセット
      const sum = state.clickedCards.reduce((total, el) => (total + el.num), 0);
      sum > 15 ? state.clickedCards = [] : '';

      // 合計値が15の場合選んだカードを消す
      if (sum === 15){
        for (var i = 0; i<state.clickedCards.length; i ++){
          const clickedCard = state.clickedCards[i];
          if (state.deck.length > 0){ //デッキにカードが存在する間
            arry.splice(arry.indexOf(clickedCard), 1, state.deck[0]);
            state.deck.shift();
          } else { //デッキのカードがなくなれば
            arry.splice(arry.indexOf(clickedCard), 1)
          }
        }
        state.openedCards = arry;
        state.clickedCards = [];
      }
    // J, Q, Kを押した時の処理
    } else if (n.num > 10){ //
      //数字カードを既に押している場合リセット
      const checkNum = state.clickedCards.find(el => el.num < 11);
      checkNum ? state.clickedCards = [] : '';
      //別柄のカードを押している場合リセット
      const checkMark = state.clickedCards.find(el => el.mark !== n.mark);
      checkMark ? state.clickedCards = [] : '';
      //３枚同じ柄を選んだ場合削除
      if (!checkMark && state.clickedCards.length == 3){
        for (var i = 0; i<state.clickedCards.length; i ++){
          const clickedCard = state.clickedCards[i];
          if (state.deck.length > 0){ //デッキにカードが存在する間
            arry.splice(arry.indexOf(clickedCard), 1, state.deck[0]);
            state.deck.shift();
          } else { //デッキのカードがなくなれば
            arry.splice(arry.indexOf(clickedCard), 1)
          }
        }
        state.openedCards = arry;
        state.clickedCards = [];
      }
    }

    // state.openedCards = []; //デバック用クリア処理
    // state.deck = [];
    // state.openedCards = [{mark:"h", num:"1"},{mark:"h", num:"2"},{mark:"h", num:"3"} ];
    if (state.openedCards.length === 0){
      state.cleared = true
    }
  },
  modalOpen(state){
    state.modalOption = true;
  },
  modalClose(state){
    state.modalOption = false;
  },
  closeClearedWindow(state){
    state.cleared = false;
  }

};

export const actions = {
  // async getBoard({ commit, state }) {
  //   const board = await this.$axios.$get(`${state.mypath}/board`);
  //   commit('setBoard', board);
  // },

};
