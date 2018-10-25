import axios from 'axios'

export default {
  // getArticles will use MongoDB to find saved articles
  getRestaurants: function (query) {
    axios.get(`/api/restaurants/${this.state.hasFood}/${this.state.hasDrink}/${this.state.foodCat}`)
      .then(function (response) {
        console.log('This is the API utils talking')
        console.log(response)
      })
      .catch(function (error) {
        console.log(error)
      })
  }

}
