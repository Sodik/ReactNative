import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {Component} from 'react';
import {connect} from 'react-redux';

const style = StyleSheet.create({
  container: {
    display: 'flex',
    flexGrow: 1,
  },
  item: {
    padding: 5
  }
});

class StackOverflowScreen extends Component {
  static navigationOptions = {
    title: 'Stackoverflow'
  };

  componentDidMount() {
    this.props.dispatch({
      type: 'FETCH_REQUESTED'
    });
  }

  render() {
    const { data } = this.props;

    return (
      <ScrollView contentContainerStyle={style.container}>
        { data.map(item => (
          <View key={item.question_id} style={style.item}>
            <Text
            >{`${item.title}`}</Text>
          </View>
        )) }
      </ScrollView>
    );
  }
}

export default connect(({ data }) => ({ data }))(StackOverflowScreen);