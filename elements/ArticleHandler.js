import React, { Component } from "react";
import { FlatList, AsyncStorage, AppState } from "react-native";
import Article from "../elements/Article";
type Props = {};

/*const articles = [
  { title: "tytuł 1", description: "opis", url: "a" },
  { title: "tytuł 2", description: "opis", url: "b" },
  { title: "tytuł 3", description: "opis", url: "c" },
  { title: "tytuł 4", description: "opis", url: "d" }
];*/

export async function getNews() {
  //get user login and user Password and pass to link
  let login = await AsyncStorage.getItem("login");
  let password = await AsyncStorage.getItem("password");
  let address = await AsyncStorage.getItem("address");
  let data = await fetch(
    "http://" +
      address +
      "/4ses/servlet/wall-results-service" +
      "?auth_key=540dc2800a3a54e07149bdedbe5332e3" +
      "&format=json" +
      "&mode=newest" +
      "&username=" +
      login +
      "&password=" +
      password
  ).then(response => response.json());
  return data.results;
}

class ArticleHandler extends Component<Props> {
  constructor(props) {
    super(props);
    this.state = { articles: [], refreshing: true, appState: AppState.currentState };
  }

  componentWillUnmount() {
    AppState.removeEventListener('change', this._handleAppStateChange);
  }

  componentDidMount() {
    AppState.addEventListener('change', this._handleAppStateChange);
    this.fetchNews();
  }

  _handleAppStateChange = (nextAppState) => {
   if (this.state.appState.match(/inactive|background/) && nextAppState === 'active') {
       //odswiez gdy aplikacja powroci do foreground:
       this.fetchNews();
   }
   this.setState({appState: nextAppState});
 }

  fetchNews() {
    getNews()
      .then(articles => this.handlePosts(articles))
      .catch(() => this.setState({ refreshing: false }));
  }


  handleRefresh() {
    this.setState({ refreshing: true }, () => this.fetchNews());
  }
 /* handleLoadMore() {
    this.setState({ refreshing: true }, () => this.fetchNews());
}*/

  handlePosts = articles => {
    //zapis do globalnej zmiennej:
    AsyncStorage.setItem("posts", JSON.stringify(articles));
    //zapis stanu:
    this.setState({ articles, refreshing: false });
  };

  render() {
    return (
      <FlatList
        data={this.state.articles}
        renderItem={({ item }) => <Article article={item} />}
        keyExtractor={item => item.id_element}
        refreshing={this.state.refreshing}
        onRefresh={this.handleRefresh.bind(this)}
        /*Podzial na strony (serwer musi przesylac taki podział[page1, page2 itd])
        onEndReached={this.handleLoadMore}
        onEndThrreshold={0}*/

      />
    );
  }
}
export default ArticleHandler;
