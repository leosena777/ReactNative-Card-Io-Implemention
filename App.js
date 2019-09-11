import React, {Component} from 'react';
import {View, TouchableOpacity, Text, Platform, StyleSheet} from 'react-native';
import {CardIOModule, CardIOUtilities} from 'react-native-awesome-card-io';

class App extends Component {
  state = {
    cardNumber: '',
    cardType: '',
    cardholderName: '',
    cvv: '',
    expiryMonth: '',
    expiryYear: '',
    postalCode: '',
    redactedCardNumber: '',
  };

  componentWillMount() {
    if (Platform.OS === 'ios') {
      CardIOUtilities.preload();
    }
  }

  scanCard() {
    CardIOModule.scanCard({
      hideCardIOLogo: true,
      suppressManualEntry: true,
      suppressConfirmation: true,
      requireExpiry: true,
      requireCVV: true,
      requireCardholderName: true,
      suppressScannedCardImage: true,
    })
      .then(card => {
        // the scanned card
        this.setState({...card});
      })
      .catch(err => {
        // the user cancelled
        console.log(err);
      });
  }

  render() {
    return (
      <View style={{flex: 1, alignContent: 'center', justifyContent: 'center'}}>
        <View style={styles.card}>
          <Text>
            <Text Text style={styles.t}>
              cardNumber:
            </Text>
            {this.state.cardNumber}
          </Text>
          <Text>
            <Text style={styles.t}>cardType:</Text> {this.state.cardType}
          </Text>
          <Text>
            <Text style={styles.t}>cardholderName:</Text>
            {this.state.cardholderName}
          </Text>
          <Text>
            <Text style={styles.t}>cvv:</Text> {this.state.cvv}
          </Text>
          <Text>
            <Text style={styles.t}>expiryMonth:</Text> {this.state.expiryMonth}
          </Text>
          <Text>
            <Text style={styles.t}>expiryYear:</Text> {this.state.expiryYear}
          </Text>
          <Text>
            <Text style={styles.t}>postalCode:</Text> {this.state.postalCode}
          </Text>
          <Text>
            <Text style={styles.t}>redactedCardNumber:</Text>
            {this.state.redactedCardNumber}
          </Text>
        </View>
        <TouchableOpacity onPress={this.scanCard.bind(this)} style={styles.bt}>
          <Text style={{color: '#fff'}}>Scan card!</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  bt: {
    width: 150,
    backgroundColor: '#000',
    padding: 15,
    alignSelf: 'center',
    alignItems: 'center',
    borderRadius: 6,
  },
  card: {
    backgroundColor: '#c6c6c6',
    padding: 20,
    width: '80%',
    alignSelf: 'center',
    borderRadius: 6,
    marginBottom: 20,
  },
  t: {
    fontWeight: 'bold',
    color: '#666',
  },
});

export default App;
