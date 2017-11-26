import React, { Component } from "react";
import {
  StyleSheet,
  ScrollView,
  Modal,
  View,
  AsyncStorage,
  Image,
  TouchableOpacity,
  TouchableWithoutFeedback,
  TouchableHighlight,
  Text
} from "react-native";

import Card from "./Card";

export default class GameBard extends Component {
  //TODO make images async.
  constructor(props) {
    super(props);

    this.state = {
      images: [],
      imagesData: [],
      loading: true,
      modalVisible: false,
      modalTitle: "[title]",
      modalDescription: "[description]",
      modalSource:
        "https://static.independent.co.uk/s3fs-public/styles/article_small/public/thumbnails/image/2016/03/10/18/mona-lisa.jpg"
    };
    this.generateImages();
  }

  Game = {
    selection: -1,
    selectCard: null
  };

  setModalVisible(visible, id) {
    if (id != null) {
      //console.warn(id)
      for (var i = 0; i < this.state.imagesData.length; i++) {
        if (this.state.imagesData[i].id == id) {
          this.setState({
            modalTitle: this.state.imagesData[i].name,
            modalDescription: this.state.imagesData[i].description,
            modalSource: this.state.imagesData[i].source
          });
          break;
        }
      }
    }
    this.setState({ modalVisible: visible });
  }

  CompletedCards = [];

  compare(key, isFliped, card) {
    if (isFliped) {
      if (this.Game.selection == -1) {
        this.Game.selection = key;
        this.Game.selectCard = card;
      } else {
        if (this.Game.selection == key) {
          // alert("Match!");
          this.Game.selectCard.setState({ clickable: false });
          card.setState({ clickable: false });
          this.setModalVisible(true, key);
          this.CompletedCards.push(this.Game.selectCard, card);
        } else {
          // alert("No Match!");
          this.Game.selectCard._toggleCard();
          card._toggleCard();
        }
        this.Game.selection = -1;
        this.Game.selectCard = null;
      }
    } else if (this.Game.selectCard == card && card.selected != true) {
      this.Game.selectCard = null;
      this.Game.selection = -1;
    }
  }

  press(key, card) {
    if (this.Game.selection == key && this.Game.selectCard != card) {
      this.Game.selectCard.selected = true;
      card._toggleCard();
    }

    if (this.Game.selectCard == card && card.selected != true) {
      this.Game.selectCard = null;
      this.Game.selection = -1;
    }

    if (!card.selected) {
      card._toggleCard();
      return;
    }
  }

  generateImages() {
    const update = async () => {
      let version = 0;
      try {
        const value = await AsyncStorage.getItem("version");
        if (value !== null) {
          version = value;
        }
      } catch (error) {
        console.error(error);
      }

      try {
        let response = await fetch("http://104.236.141.69/art/version.json");
        let responseJson = await response.json();
        //console.warn(responseJson.version + " : " + parseInt(version))
        return !(responseJson.version == parseInt(version));
      } catch (error) {
        console.error(error);
      }
    };

    const download = async () => {
      //console.warn("downloading")
      let response = await fetch("http://104.236.141.69/art/download.json");
      let responseJson = await response.json();
      await AsyncStorage.setItem(
        "version",
        JSON.stringify(responseJson.version)
      );

      //console.warn("downloaded: " + JSON.stringify(responseJson));
      return responseJson.images;
    };

    const save = async images => {
      //console.warn("saving: " + JSON.stringify(images))
      await AsyncStorage.setItem("images", JSON.stringify(images));
    };

    const get = async () => {
      let response = await AsyncStorage.getItem("images");
      //console.warn("getting: " + response);
      return JSON.parse(response);
    };

    const that = this;

    const generate = async () => {
      get().then(function(images) {
        //console.warn("Generating: " + JSON.stringify(images))
        //Randomize the entire array
        images.sort(function() {
          return 0.5 - Math.random();
        });

        //console.warn("Randomize: " + JSON.stringify(images));

        //Take the first 8
        images = images.slice(0, 8);

        //Duplicate
        images = images.reduce(function(res, current, index, array) {
          return res.concat([current, current]);
        }, []);

        //Randomize again
        images.sort(function() {
          return 0.5 - Math.random();
        });

        let Images = [];
        for (var i = 0; i < images.length; i++) {
          Images.push(
            <Card
              key={i}
              compare={that.press.bind(that)}
              clickable={true}
              index={images[i].id}
              onFlipEnd={that.compare.bind(that)}
              source={images[i].source}
            />
          );
        }

        that.setState({ images: Images, imagesData: images, loading: false });
      });
    };

    update().then(function(doUpdate) {
      if (doUpdate) {
        download().then(function(images) {
          save(images).then(function() {
            generate();
          });
        });
      } else {
        generate();
      }
    });
  }

  reset() {
    for (var i = 0; i < this.CompletedCards.length; i++) {
      this.CompletedCards[i].setState({ clickable: true });
      this.CompletedCards[i].selected = false;
    }
    this.CompletedCard = [];

    this.setState({ images: this.generateImages() });
    this.Game.selection = -1;
    this.Game.selectCard = null;
  }

  render() {
    return (
      <ScrollView>
        <View style={styles.container}>{this.state.images}</View>
        <Modal
          transparent={true}
          animationType="slide"
          visible={this.state.modalVisible}
          onRequestClose={() => {
            this.setModalVisible(false);
          }}
        >
          <TouchableOpacity
            style={styles.centerModal}
            activeOpacity={1}
            onPress={() => {
              this.setModalVisible(false);
            }}
          >
            <ScrollView
              directionalLockEnabled={true}
              contentContainerStyle={styles.centerModal}
            >
              <TouchableWithoutFeedback>
                <View
                  style={{
                    justifyContent: "center",
                    margin: 40
                  }}
                >
                  <View
                    style={{
                      elevation: 1
                    }}
                  >
                    <Image
                      style={{
                        height: 200,
                        width: null,
                        borderTopLeftRadius: 2,
                        borderTopRightRadius: 2
                      }}
                      source={{
                        uri: this.state.modalSource
                      }}
                    />
                  </View>

                  <View
                    style={{
                      backgroundColor: "white",
                      padding: 24,
                      borderBottomLeftRadius: 2,
                      borderBottomRightRadius: 2,
                      elevation: 1
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 24,
                        marginBottom: 8,
                        color: "black"
                      }}
                    >
                      {this.state.modalTitle}
                    </Text>
                    <Text
                      style={{
                        fontSize: 15
                      }}
                    >
                      {this.state.modalDescription}
                    </Text>
                  </View>
                </View>
              </TouchableWithoutFeedback>
            </ScrollView>
          </TouchableOpacity>
        </Modal>
      </ScrollView>
    );
  }

  componentDidMount() {
    this.props.onRef(this);
  }
  componentWillUnmount() {
    this.props.onRef(undefined);
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap"
  },
  centerModal: {
    flex: 1,
    justifyContent: "center"
  }
});
