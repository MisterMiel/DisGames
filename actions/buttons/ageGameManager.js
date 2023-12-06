module.exports = {
    data: {
        name: 'nextpage'
    },
    run: function (client, functions, connection, button) {
        button.reply({ content: 'next page', ephemeral: true });
        console.log(button)

    }
}