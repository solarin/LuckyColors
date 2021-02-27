import React, { Component } from "react";
import NavigationBar from "../Navbar";
import Main from "../Main";
import HistorySummary from "../HistorySummary";
import AllowedBets from "../AllowedBets";
import BalanceBar from "../BalanceBar";
import StatusBar from "../Statusbar";
import axios from "axios";
import { toast } from "react-toastify";
import { format } from "react-string-format";

class Home extends Component {
    constructor(props) {
        super(props);
        this._isMounted = false;
        this.state = {
            balance: Number,
            multiplier: Number,
            currency: String,
            allowedBets: [],
            title: String,
            logoUrl: String,
            firstNum: "?",
            secondNum: "?",
            thirdNum: "?",
            sumNum: "?",
            eventName: "",
            betAmount: 0,
            timerDuration: 0.0,
            isCounterTobeUpdated: true,
            maxBet: 0,
            eventDescArray: [],
            winningStatus: "",
            winningResult: "",
            timer: 1,
            param: new URLSearchParams(this.props.location.search),
            translations: [],
            greenText: "",
            violetText: "",
            redText: "",
            historyText: "",
            balanceText: "",
            betText: "",
            maxwinText: "",
            VIOLET_SYMBOL: "",
            GREEN_SYMBOL: "",
            RED_SYMBOL: "",
            BIG_SYMBOL: "",
            SMALL_SYMBOL: "",
            ODD_SYMBOL: "",
            EVEN_SYMBOL: "",
            GAME_INFO_TITLE: "",
            GAME_INFO: "",
            SUM_IS: "",
            NTH_NUMBER_IS: "",
            ID: "",
            Date: "",
            Time: "",
            BET_AMOUNT: "",
            WON_AMOUNT: "",
            STATUS: "",
            ACTION: "",
            VIEW: "",
            CANCEL: "",
            BETS_OPEN: "",
            BETS_CLOSED: "",
            YOU_WON: "",
            NOT_ENOUGH_CREDIT: "",
            BET_DENIED: "",
            BET_SUCCESS: "",
            EXIT_URL: "",
            BET_CANT_CANCEL: "",
            BET_AMOUNT_ZERO: "",
            INVALID_EVENT: "",
            AUTH_TOKEN: "",
            GAME_TOKEN: "",
            Show_loader: false,
            timerKey: false,
            betsOpen: false,
            clearBetKey: false,
            EVENT: "",
            SUM: "",
            RESULT: "",
            NUMBERS: "",
            PENDING_STATUS: "",
            CANCELED_STATUS: "",
            REFUSED_STATUS: "",
            ERROR_STATUS: "",
            WON_STATUS: "",
            LOST_STATUS: "",
            BET_CANCELED: "",
            historyArray: [],
        };
    }
    componentDidMount() {
        this._isMounted = true;
        var title = this.state.param.get(`title`);
        var event = this.state.param.get(`event`);
        this.setState({
            AUTH_TOKEN: new URLSearchParams(this.props.location.search).get(
                "authToken"
            ),
        });
        this.setState({
            GAME_TOKEN: new URLSearchParams(this.props.location.search).get(
                "gameToken"
            ),
        });
        this.setState({ eventName: event });
        // first = first == null ? "?" : first;
        // second = second == null ? "?" : second;
        // third = third == null ? "?" : third;
        // sum = sum == null ? "?" : sum;

        axios
            .get(
                `${process.env.REACT_APP_API_URL}/LuckyColors/GetSettings?authToken=` +
                new URLSearchParams(this.props.location.search).get("authToken") +
                `&gameToken=` +
                new URLSearchParams(this.props.location.search).get("gameToken")
            )
            .then((res) => {
                document.title = res.data.settings.title;
                var link = document.querySelector("link[rel~='icon']");
                link.href = res.data.settings.logoUrl;

                this.setState({ balance: isNaN(res.data.balance) ? 0 : res.data.balance });
                this.setState({ allowedBets: res.data.settings.allowedBets });
                this.setState({ multiplier: res.data.settings.multiplier });
                this.setState({ currency: res.data.settings.currency });
                this.setState({ title: res.data.settings.title });
                this.setState({ logoUrl: res.data.settings.logoUrl });
                this.setState({ eventDescArray: res.data.settings.eventDescs });
                this.setState({ EXIT_URL: res.data.settings.exitUrl });
                this.setState({ betsOpen: res.data.betsOpen });
                console.log("EXIT_URL", this.state.EXIT_URL);

                var valBetsCloseMillis = isNaN(res.data.betsCloseMillis) ? 0 : res.data.betsCloseMillis;
                var valNextRoundStartsMillis = isNaN(res.data.nextRuondStartsMillis) ? 0 : res.data.nextRuondStartsMillis;

                this.setState({
                    timerDuration: valNextRoundStartsMillis === 0 ?
                        valBetsCloseMillis : valNextRoundStartsMillis,
                });
                this.setState({
                    timerKey: valNextRoundStartsMillis === 0 ?
                        false : true,
                });
                this.setState({
                    isCounterTobeUpdated: false,
                });
                this.setState({ translations: res.data.settings.translations });
                this.GetUITextByKey("BIG");
                this.GetUITextByKey("SMALL");
                this.GetUITextByKey("ODD");
                this.GetUITextByKey("EVEN");
                this.GetUITextByKey("VIOLET");
                this.GetUITextByKey("GREEN");
                this.GetUITextByKey("RED");
                this.GetUITextByKey("BIG_SYMBOL");
                this.GetUITextByKey("SMALL_SYMBOL");
                this.GetUITextByKey("ODD_SYMBOL");
                this.GetUITextByKey("EVEN_SYMBOL");
                this.GetUITextByKey("VIOLET_SYMBOL");
                this.GetUITextByKey("GREEN_SYMBOL");
                this.GetUITextByKey("RED_SYMBOL");
                this.GetUITextByKey("GameInfoTitle");
                this.GetUITextByKey("GameInfo");
                this.GetUITextByKey("FIRST");
                this.GetUITextByKey("SECOND");
                this.GetUITextByKey("THIRD");
                this.GetUITextByKey("HISTORY");
                this.GetUITextByKey("BALANCE");
                this.GetUITextByKey("BET");
                this.GetUITextByKey("MAXWIN");
                this.GetUITextByKey("ID");
                this.GetUITextByKey("Date");
                this.GetUITextByKey("Time");
                this.GetUITextByKey("BET_AMOUNT");
                this.GetUITextByKey("WON_AMOUNT");
                this.GetUITextByKey("STATUS");
                this.GetUITextByKey("ACTION");
                this.GetUITextByKey("VIEW");
                this.GetUITextByKey("CANCEL");
                this.GetUITextByKey("NTH_NUMBER_IS");
                this.GetUITextByKey("SUM_IS");
                this.GetUITextByKey("BETS_OPEN");
                this.GetUITextByKey("BETS_CLOSED");
                this.GetUITextByKey("NOT_ENOUGH_CREDIT");
                this.GetUITextByKey("BET_DENIED");
                this.GetUITextByKey("BET_SUCCESS");
                this.GetUITextByKey("BET_AMOUNT_ZERO");
                this.GetUITextByKey("INVALID_EVENT");
                this.GetUITextByKey("BET_CANT_CANCEL");
                this.GetUITextByKey("BET_CANCELED");
                this.GetUITextByKey("EVENT");
                this.GetUITextByKey("SUM");
                this.GetUITextByKey("RESULT");
                this.GetUITextByKey("NUMBERS");

                this.GetUITextByKey("PENDING_STATUS");
                this.GetUITextByKey("CANCELED_STATUS");
                this.GetUITextByKey("REFUSED_STATUS");
                this.GetUITextByKey("ERROR_STATUS");
                this.GetUITextByKey("WON_STATUS");
                this.GetUITextByKey("LOST_STATUS");
                this.GetUITextByKey("YOU_WON");


                //Set Status
                if (valBetsCloseMillis === 0) {
                    this.setState({
                        winningStatus: this.state.BETS_CLOSED,
                    });
                } else {
                    this.setState({
                        winningStatus: this.state.BETS_OPEN,
                    });
                }


            });
        axios
            .get(
                `${process.env.REACT_APP_API_URL}/LuckyColors/GetRoundHistory?authToken=` +
                new URLSearchParams(this.props.location.search).get("authToken") +
                `&gameToken=` +
                new URLSearchParams(this.props.location.search).get("gameToken")
            )
            .then((res) => {
                this.setState({ historyArray: res.data.roundHistory });
            });
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    GetUITextByKey(key) {
        if (this.state.translations.length > 0) {
            this.state.translations.forEach((item) => {
                if (item.key == key) {
                    switch (key) {
                        case "BIG":
                            this.setState({
                                bigText: item.value,
                            });
                            break;
                        case "SMALL":
                            this.setState({
                                smallText: item.value,
                            });
                            break;
                        case "ODD":
                            this.setState({
                                oddText: item.value,
                            });
                            break;
                        case "EVEN":
                            this.setState({
                                evenText: item.value,
                            });
                            break;
                        case "VIOLET":
                            this.setState({
                                violetText: item.value,
                            });
                            break;
                        case "GREEN":
                            this.setState({
                                greenText: item.value,
                            });
                            break;
                        case "RED":
                            this.setState({
                                redText: item.value,
                            });
                            break;
                        case "BIG_SYMBOL":
                            this.setState({
                                BIG_SYMBOL: item.value,
                            });
                            break;
                        case "SMALL_SYMBOL":
                            this.setState({
                                SMALL_SYMBOL: item.value,
                            });
                            break;
                        case "ODD_SYMBOL":
                            this.setState({
                                ODD_SYMBOL: item.value,
                            });
                            break;
                        case "EVEN_SYMBOL":
                            this.setState({
                                EVEN_SYMBOL: item.value,
                            });
                            break;
                        case "VIOLET_SYMBOL":
                            this.setState({
                                VIOLET_SYMBOL: item.value,
                            });
                            break;
                        case "GREEN_SYMBOL":
                            this.setState({
                                GREEN_SYMBOL: item.value,
                            });
                            break;
                        case "RED_SYMBOL":
                            this.setState({
                                RED_SYMBOL: item.value,
                            });
                            break;
                        case "GameInfoTitle":
                            this.setState({
                                GAME_INFO_TITLE: item.value,
                            });
                            break;
                        case "GameInfo":
                            this.setState({
                                GAME_INFO: item.value,
                            });
                            break;
                        case "FIRST":
                            this.setState({
                                firstText: item.value,
                            });
                            break;
                        case "SECOND":
                            this.setState({
                                secondText: item.value,
                            });
                            break;
                        case "THIRD":
                            this.setState({
                                thirdText: item.value,
                            });
                            break;
                        case "SUM":
                            this.setState({
                                sumText: item.value,
                            });
                            break;
                        case "HISTORY":
                            this.setState({
                                historyText: item.value,
                            });
                            break;
                        case "BALANCE":
                            this.setState({
                                balanceText: item.value,
                            });
                            break;
                        case "BET_AMOUNT":
                            this.setState({
                                betText: item.value,
                            });
                            break;
                        case "MAXWIN":
                            this.setState({
                                maxwinText: item.value,
                            });
                            break;
                        case "ID":
                            this.setState({
                                ID: item.value,
                            });
                            break;
                        case "Date":
                            this.setState({
                                Date: item.value,
                            });
                            break;
                        case "Time":
                            this.setState({
                                Time: item.value,
                            });
                            break;
                        // case "BET_AMOUNT":
                        //     this.setState({
                        //         BET_AMOUNT: item.value,
                        //     });
                        //     break;
                        case "WON_AMOUNT":
                            this.setState({
                                WON_AMOUNT: item.value,
                            });
                            break;
                        case "STATUS":
                            this.setState({
                                STATUS: item.value,
                            });
                            break;
                        case "ACTION":
                            this.setState({
                                ACTION: item.value,
                            });
                            break;
                        case "VIEW":
                            this.setState({
                                VIEW: item.value,
                            });
                            break;
                        case "CANCEL":
                            this.setState({
                                CANCEL: item.value,
                            });
                            break;
                        case "NTH_NUMBER_IS":
                            this.setState({
                                NTH_NUMBER_IS: item.value,
                            });
                            break;
                        case "SUM_IS":
                            this.setState({
                                SUM_IS: item.value,
                            });
                            break;
                        case "BETS_OPEN":
                            this.setState({
                                BETS_OPEN: item.value,
                            });
                            break;
                        case "BETS_CLOSED":
                            this.setState({
                                BETS_CLOSED: item.value,
                            });
                            break;
                        case "YOU_WON":
                            this.setState({
                                YOU_WON: item.value,
                            });
                            break;
                        case "NOT_ENOUGH_CREDIT":
                            this.setState({
                                NOT_ENOUGH_CREDIT: item.value,
                            });
                            break;
                        case "BET_DENIED":
                            this.setState({
                                BET_DENIED: item.value,
                            });
                            break;
                        case "BET_SUCCESS":
                            this.setState({
                                BET_SUCCESS: item.value,
                            });
                            break;
                        case "BET_AMOUNT_ZERO":
                            this.setState({
                                BET_AMOUNT_ZERO: item.value,
                            });
                            break;
                        case "BET_CANT_CANCEL":
                            this.setState({
                                BET_CANT_CANCEL: item.value,
                            });
                            break;
                        case "BET_CANCELED":
                            this.setState({
                                BET_CANCELED: item.value,
                            });
                            break;
                        case "INVALID_EVENT":
                            this.setState({
                                INVALID_EVENT: item.value,
                            });
                            break;

                        case "EVENT":
                            this.setState({
                                EVENT: item.value,
                            });
                            break;
                        case "RESULT":
                            this.setState({
                                RESULT: item.value,
                            });
                            break;
                        case "NUMBERS":
                            this.setState({
                                NUMBERS: item.value,
                            });
                            break;
                        case "PENDING_STATUS":
                            this.setState({
                                PENDING_STATUS: item.value,
                            });
                            break;
                        case "CANCELED_STATUS":
                            this.setState({
                                CANCELED_STATUS: item.value,
                            });
                            break;
                        case "REFUSED_STATUS":
                            this.setState({
                                REFUSED_STATUS: item.value,
                            });
                            break;

                        case "ERROR_STATUS":
                            this.setState({
                                ERROR_STATUS: item.value,
                            });
                            break;
                        case "WON_STATUS":
                            this.setState({
                                WON_STATUS: item.value,
                            });
                            break;
                        case "LOST_STATUS":
                            this.setState({
                                LOST_STATUS: item.value,
                            });
                            break;
                    }
                }
            });
        }
    }

    setEventName = (eName) => {
        this.setState({ clearBetKey: false });

        this.setState({ eventName: eName });
        this.setState({
            betAmount: 0,
        });

        //Clear number event
        this.setState({ maxBet: 0 });


    };
    setBETBalance = (amount) => {
        this.setState({
            balance: amount
        });
    }

    setBETAmount = (amount) => {
        var newAmount = parseFloat((Number(this.state.betAmount) + Number(amount)).toFixed(2));

        this.setState({
            betAmount: newAmount,
        });

        if (this.state.eventName === 0 || !isNaN(this.state.eventName)) {
            this.state.eventDescArray.forEach(item => {
                if (Number(item.name) === 1) {
                    this.setState({ maxBet: parseFloat((Number(item.payoutMul) * newAmount).toFixed(2)) });
                }
            })
        }
        if (isNaN(this.state.eventName)) {
            this.state.eventDescArray.forEach(item => {
                if (item.name === this.state.eventName) {
                    this.setState({ maxBet: parseFloat((Number(item.payoutMul) * newAmount).toFixed(2)) });
                }
            })
        }

    };

    PlaceBet = () => {
        this.setState({ Show_loader: true });

        if (this.state.balance < this.state.betAmount) {
            this.setState({ Show_loader: false });
            toast.error(this.state.NOT_ENOUGH_CREDIT, {
                position: toast.POSITION.TOP_CENTER,
            });
        } else if (
            this.state.eventName === null &&
            this.state.param.get(`event`) === null
        ) {
            this.setState({ Show_loader: false });
            toast.error(this.state.INVALID_EVENT, {
                position: toast.POSITION.TOP_CENTER,
            });
        } else if (this.state.betAmount === null || this.state.betAmount === 0) {
            this.setState({ Show_loader: false });
            toast.error(this.state.BET_AMOUNT_ZERO, {
                position: toast.POSITION.TOP_CENTER,
            });
        } else if (this.state.timerKey) {
            this.setState({ Show_loader: false });
            toast.error(this.state.BET_DENIED, {
                position: toast.POSITION.TOP_CENTER,
            });
        } else {

            axios
                .get(
                    `${process.env.REACT_APP_API_URL}/LuckyColors/PlaceBet?authToken=` +
                    new URLSearchParams(this.props.location.search).get("authToken") +
                    "&gameToken=" +
                    new URLSearchParams(this.props.location.search).get("gameToken") +
                    "&amount=" +
                    this.state.betAmount +
                    "&betContent=" +
                    this.state.eventName
                )
                .then((res) => {
                    console.log("Show_loader", this.state.Show_loader);
                    this.setState({ Show_loader: false });
                    console.log("Show_loader", this.state.Show_loader);


                    var valNextRoundStartsMillis = isNaN(res.data.nextRuondStartsMillis) ? 0 : res.data.nextRuondStartsMillis;
                    var valBetsCloseMillis = isNaN(res.data.betsCloseMillis) ? 0 : res.data.betsCloseMillis;

                    var nextRuondStartsMillis = Number(valNextRoundStartsMillis);
                    var betsCloseMillis = Number(valBetsCloseMillis);

                    this.setState({
                        isCounterTobeUpdated: true,
                    });
                    if (nextRuondStartsMillis === 0) {
                        this.setState({
                            timerDuration: betsCloseMillis,
                        });
                    } else {
                        this.setState({
                            timerDuration: nextRuondStartsMillis,
                        });
                    }
                    this.setState({
                        isCounterTobeUpdated: false,
                    });

                    if (isNaN(res.data.errorNo) || res.data.errorNo == 0) {
                        this.setState({ balance: isNaN(res.data.balance) ? 0 : res.data.balance });
                        toast.success(this.state.BET_SUCCESS, {
                            position: toast.POSITION.TOP_CENTER,
                        });
                    } else {
                        this.setState({ balance: isNaN(res.data.balance) ? 0 : res.data.balance });
                        toast.error(this.state.BET_DENIED, {
                            position: toast.POSITION.TOP_CENTER,
                        });
                    }
                });
        }

    };

    onCounterComplete = () => {
        axios
            .get(
                `${process.env.REACT_APP_API_URL}/LuckyColors/GetUpdates?authToken=` +
                new URLSearchParams(this.props.location.search).get("authToken") +
                "&gameToken=" +
                new URLSearchParams(this.props.location.search).get("gameToken")
            )
            .then((res) => {
                if (res.data.roundHistory) {
                    this.setState({ historyArray: res.data.roundHistory });
                }
                this.setState({ balance: isNaN(res.data.balance) ? 0 : res.data.balance });

                var winningInfo = res.data.winningInfo;

                var valNextRoundStartsMillis = isNaN(res.data.nextRuondStartsMillis) ? 0 : res.data.nextRuondStartsMillis;
                var valBetsCloseMillis = isNaN(res.data.betsCloseMillis) ? 0 : res.data.betsCloseMillis;

                var nextRuondStartsMillis = Number(valNextRoundStartsMillis);
                var betsCloseMillis = Number(valBetsCloseMillis);
                this.setState({ betsOpen: res.data.betsOpen });

                //Set Status
                if (valBetsCloseMillis === 0) {
                    this.setState({
                        winningStatus: this.state.BETS_CLOSED,
                    });
                } else {
                    this.setState({
                        winningStatus: this.state.BETS_OPEN,
                    });
                }

                if (winningInfo) {
                    console.log(winningInfo)
                    this.setState({
                        winningResult: format(
                            this.state.YOU_WON + " " + winningInfo.currency,
                            winningInfo.winAmount
                        )
                    });
                    setTimeout(() => {
                        this.setState({ winningResult: "" });
                    }, 10000)
                    // this.state.eventDescArray.forEach((item) => {
                    //   if (item.name == this.state.eventName) {

                    //   }
                    // });
                } else {
                    this.setState({
                        winningResult: ""
                    });
                }
                this.setState({
                    isCounterTobeUpdated: true,
                });
                if (nextRuondStartsMillis === 0) {
                    this.setState({
                        timerDuration: betsCloseMillis,
                        timerKey: false
                    });
                } else {
                    this.setState({
                        timerDuration: nextRuondStartsMillis,
                        timerKey: true
                    });
                }
                this.setState({
                    isCounterTobeUpdated: false,
                });
            });
    };

    ClearBet = () => {
        this.setState({ betAmount: 0 });
        this.setState({ maxBet: 0 });
        this.setState({ firstNum: "?" });
        this.setState({ secondNum: "?" });
        this.setState({ thirdNum: "?" });
        this.setState({ sumNum: "?" });
        this.setState({ eventName: "" });
        this.setState({ clearBetKey: true });
    };

    render() {
        return [<
            NavigationBar
            logoUrl={this.state.logoUrl}
            title={this.state.title}
            timerDuration={this.state.timerDuration}
            onCounterComplete={this.onCounterComplete}
            EXIT_URL={this.state.EXIT_URL}
            isCounterTobeUpdated={this.state.isCounterTobeUpdated}
        />, <
            StatusBar winningStatus={this.state.winningStatus} winningResult={this.state.winningResult}
        />, <
            Main
            firstNum={this.state.firstNum}
            secondNum={this.state.secondNum}
            thirdNum={this.state.thirdNum}
            sumNum={this.state.sumNum}
            setEventName={this.setEventName}
            eventName={this.state.eventName}
            violetText={this.state.violetText}
            greenText={this.state.greenText}
            redText={this.state.redText}
            clearBetKey={this.state.clearBetKey}
            auth_token={
                new URLSearchParams(this.props.location.search).get(
                    "authToken"
                )
            }
            game_token={
                new URLSearchParams(this.props.location.search).get(
                    "gameToken"
                )
            }

        />, <
            HistorySummary
            historyText={this.state.historyText}
            ID={this.state.ID}
            Time={this.state.Time}
            BET_AMOUNT={this.state.betText}
            WON_AMOUNT={this.state.WON_AMOUNT}
            STATUS={this.state.STATUS}
            ACTION={this.state.ACTION}
            VIEW={this.state.VIEW}
            CANCEL={this.state.CANCEL}
            HISTORY={this.state.HISTORY}
            BET_CANT_CANCEL={this.state.BET_CANT_CANCEL}
            BET_CANCELED={this.state.BET_CANCELED}

            RED_SYMBOL={this.state.RED_SYMBOL}
            GREEN_SYMBOL={this.state.GREEN_SYMBOL}
            VIOLET_SYMBOL={this.state.VIOLET_SYMBOL}

            GAME_INFO_TITLE={this.state.GAME_INFO_TITLE}
            GAME_INFO={this.state.GAME_INFO}

            EVENT={this.state.EVENT}
            RESULT={this.state.RESULT}
            NUMBERS={this.state.NUMBERS}
            PENDING_STATUS={this.state.PENDING_STATUS}
            CANCELED_STATUS={this.state.CANCELED_STATUS}
            REFUSED_STATUS={this.state.REFUSED_STATUS}
            ERROR_STATUS={this.state.ERROR_STATUS}
            WON_STATUS={this.state.WON_STATUS}
            LOST_STATUS={this.state.LOST_STATUS}
            historyArray={this.state.historyArray}
            setBETBalance={this.setBETBalance}

            timerKey={this.state.timerKey}
            auth_token={
                new URLSearchParams(this.props.location.search).get(
                    "authToken"
                )
            }
            game_token={
                new URLSearchParams(this.props.location.search).get(
                    "gameToken"
                )
            }
        />, <
            AllowedBets
            setBETAmount={this.setBETAmount}
            allowedBets={this.state.allowedBets}
        />, <
            BalanceBar
            balance={this.state.balance}
            multiplier={this.state.multiplier}
            currency={this.state.currency}
            betAmount={this.state.betAmount}
            maxBet={this.state.maxBet}
            PlaceBet={this.PlaceBet}
            ClearBet={this.ClearBet}
            balanceText={this.state.balanceText}
            betText={this.state.betText}
            maxwinText={this.state.maxwinText}
            Show_loader={this.state.Show_loader}
        />,
        ];
    }
}

export default Home;