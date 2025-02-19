import {StyleSheet} from 'react-native';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';

export const globalStyles = StyleSheet.create({
  // wrapper
  wrapper: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingTop: 12,
  },

  // form Title
  formTitle: {
    width: '100%',
    fontSize: wp('3.8%'),
    color: '#666666',
  },

  // form Input
  formInput: {
    width: '100%',
    height: 40,
    justifyContent: 'center', //for datePicker
    borderWidth: 1,
    borderColor: '#E6E6E6',
    borderRadius: 4,
    backgroundColor: 'white',
    fontFamily: 'HelveticaNeueLight',
    color: 'black',
    fontSize: wp('4'),
    marginTop: 5,
    marginBottom: 20,
    paddingLeft: 12,
    paddingRight: 12,
    paddingTop: 5,
    paddingBottom: 5,
  },

  // bottom Text
  bottomText: {
    fontSize: wp('4%'),
    color: '#346C75',
    marginTop: 12,
    marginBottom: 34,
  },

  // ------------------------------ Dropdown START ------------------------------
  dropdownButtonStyle: {
    height: 42,
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    borderWidth: 1,
    borderColor: '#E6E6E6',
    borderRadius: 4,
    backgroundColor: 'white',
    fontFamily: 'HelveticaNeueLight',
    fontSize: wp('4'),
    marginTop: 5,
    marginBottom: 20,
    paddingLeft: 12,
    paddingRight: 12,
    paddingTop: 5,
    paddingBottom: 5,
    color: 'black',
  },
  dropdownButtonTxtStyle: {
    flex: 1,
    fontSize: wp('4'),
    color: 'red',
  },
  dropdownButtonArrowStyle: {
    fontSize: wp('7'),
  },
  dropdownMenuStyle: {
    backgroundColor: '#E9ECEF',
    borderRadius: 8,
  },
  dropdownItemStyle: {
    width: '100%',
    flexDirection: 'row',
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  dropdownItemTxtStyle: {
    flex: 1,
    fontSize: wp('4'),
    fontWeight: '500',
    color: 'black',
  },

  // ------------------------------ Dropdown END ------------------------------

  // ------------------------------ Tag_Input/chip START ------------------------------
  tagContainer: {
    borderWidth: 1,
    borderColor: '#E6E6E6',
    // backgroundColor: 'grey',
    borderRadius: 4,
    padding: 6,
    flexDirection: 'row',
    gap: 12,
    justifyContent: 'space-between',
    // width: wp('88%'), shareRateList_3
    width: '100%',
    marginBottom: 20,
    marginTop: 5,
  },
  chipsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 5,
    maxWidth: '95%',
    minHeight: 28,
  },
  chip: {
    backgroundColor: '#F2F2F2',
    flexDirection: 'row',
    gap: 8,
    padding: 4,
    borderRadius: 20,
    maxHeight: 30,
  },
  dropdownButtonStyle2: {
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    right: 18,
    top: 7,
  },
  dropdownButtonTxtStyle2: {
    flex: 1,
    fontSize: 14,
    // color: 'grey',
  },
  dropdownButtonArrowStyle2: {
    fontSize: 28,
  },
  dropdownButtonIconStyle2: {
    fontSize: 28,
    marginRight: 8,
  },
  dropdownMenuStyle2: {
    backgroundColor: '#E9ECEF',
    borderRadius: 8,
    position: 'relative',
    left: 20,
    width: '90%',
  },
  dropdownItemStyle2: {
    width: '100%',
    flexDirection: 'row',
    paddingHorizontal: 12,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 8,
  },
  dropdownItemTxtStyle2: {
    flex: 1,
    fontSize: 18,
    fontWeight: '500',
    color: '#151E26',
  },
  dropdownItemIconStyle2: {
    fontSize: 28,
    marginRight: 8,
  },
  // ------------------------------ Tag_Input/chip END ------------------------------

  dateIcon: {
    width: wp('5%'),
    height: wp('5%'),
    position: 'absolute',
    left: wp('2%'),
  },
  dateIconRight: {
    width: wp('5%'),
    height: wp('5%'),
    position: 'absolute',
    right: wp('2%'),
  },
});
