import Parse from 'parse'

Parse.initialize('Y7CyeI7CK5TfATuK4HdIzFVRKbF4QuszJXh61sRE', '2QRORUKBEPdsV9cTYGOCSOGJRxdmOxM0KRaMDrUb')
Parse.serverURL = 'https://parseapi.back4app.com/'

export default ({ app }, inject) => {
  inject('parse', Parse)
}