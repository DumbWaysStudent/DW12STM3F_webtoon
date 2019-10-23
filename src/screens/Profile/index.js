import React, {Component} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  AsyncStorage,
} from 'react-native';
import {Icon} from 'native-base';
import HeaderProfile from 'components/headerProfile';
import Host, {host} from '../../functions/host';
import Axios from 'axios';
import {getUserId, getUserToken} from '../../functions';

import {actionGetProfile} from '../../redux/actions/actionEditProfile';
import {connect} from 'react-redux';

class ProfileScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      imageDefault: 'https://static.thenounproject.com/png/994628-200.png',
      nameDefault: '',
      imageSource: `${this.props.userData.data.image_profile}`,
      nameSource: '',
    };
  }

  async componentDidMount() {
    AsyncStorage.getItem('username', (err, username) => {
      this.setState({nameDefault: username});
    });
    AsyncStorage.getItem('imageProfile', (err, image) => {
      console.log('IMAGE DEFAULT ', image);
      if (image !== null) {
        this.setState({imageDefault: `${host}${image}`});
      }
    });

    // console.log(`DATA PROPS ${host}${this.props.userData.data.image_profile}`);
    console.log(
      `DATA PROPS ${this.props.userData.data.image_profile}, => ${this.state.imageDefault}`,
    );
    this.setState({
      imageSource: `${this.props.userData.data.image_profile}`,
      nameSource: this.props.userData.data.username,
    });
    const token = await getUserToken();
    const userId = await getUserId();
    await this.props.actionGetProfile(userId, token);
  }

  handleEdit = () => {
    this.props.navigation.navigate('EditProfile');
  };

  render() {
    const {imageDefault, nameDefault, imageSource, nameSource} = this.state;

    return (
      <View>
        <HeaderProfile
          handleFunc={() => this.props.navigation.navigate('EditProfile')}
          title="Profile"
          icon="create"
        />
        <View style={{alignItems: 'center', marginTop: '10%'}}>
          <View style={Styles.imageProf}>
            <Image
              style={Styles.img}
              source={{
                uri: !this.props.userData.data.image_profile
                  ? imageDefault
                  : `${host}${this.props.userData.data.image_profile}`,
              }}
            />
            <Text style={{fontSize: 30}}>
              {!this.props.userData.data.username
                ? nameDefault
                : this.props.userData.data.username}
            </Text>
          </View>
        </View>
        <View style={{marginTop: 40}}>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('Creation')}>
            <View style={Styles.creation}>
              <Text style={{fontSize: 25}}>My Webtoon Creation</Text>
              <Icon name="ios-arrow-forward" style={{margin: 4}} />
            </View>
          </TouchableOpacity>
          <View style={Styles.logoutBtn}>
            <TouchableOpacity
              onPress={() => {
                AsyncStorage.clear();
                this.props.navigation.navigate('AuthLoading');
              }}>
              <Text style={{fontSize: 25}}>Log Out</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}
const mapStateToProps = state => {
  return {
    userData: state.getProfile.data,
  };
};

export default connect(
  mapStateToProps,
  {actionGetProfile},
)(ProfileScreen);

const Styles = StyleSheet.create({
  textProf: {fontSize: 25, fontWeight: 'bold'},
  textHeader: {marginTop: 15, marginLeft: 35},
  img: {height: 150, width: 150, borderRadius: 100},
  imageProf: {justifyContent: 'center', alignItems: 'center'},
  creation: {
    borderBottomWidth: 2,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
  logoutBtn: {
    borderBottomWidth: 2,
    paddingHorizontal: 10,
    marginTop: 5,
    paddingBottom: 5,
  },
  headerContainer: {
    marginTop: 0,
    padding: 0,
    borderBottomWidth: 2,
  },
  header: {
    width: '100%',
    height: 60,
    backgroundColor: 'grey',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
