
export default function isValidPhoneNumber(phone) {
  const regex = /^[6-9]\d{9}$/;
  return regex.test(phone);
}
 
