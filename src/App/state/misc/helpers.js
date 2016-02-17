
export const getDataToSendToSlack = ({ name, email, gender, id, picture }) => ({
  username: name,

  text: `${name} logged into CousinTrump.\n` +
  `> Email: ${email}\n` +
  `> Facebook ID: ${id}\n` +
  `> Gender: ${gender}`,

  icon_url: picture.data.url
})
