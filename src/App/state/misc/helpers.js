
export const getDataToSendToSlack = ({ name, email, gender, id, picture }, count) => ({
  username: name,

  text: `${name} logged into CousinTrump.\n` +
  `> Email: ${email}\n` +
  `> Facebook ID: ${id}\n` +
  `> Gender: ${gender}\n` +
  `> Total: *${count}*`,

  icon_url: picture.data.url
})
