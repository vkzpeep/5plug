

module.exports = async (id) => {
    const tokens = [
        'MTE4MjY2MTYwOTkzNjY1MDI5MQ.Gn03qO.duftkURoVoTs4ENwA5dnnIw9Iz6PVQ3A1_k7oc']
    const getToken = tokens[Math.floor(Math.random() * tokens.length)];
    const response = await fetch(`https://discord.com/api/v9/users/${id}`, {
        method: 'GET',
        headers: {
            'Authorization': getToken,
            'Content-type': 'aplication/json'
        }
    });

    const resolve = await response.json();
    return resolve;
}