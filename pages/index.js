import axios from "axios"
class Index extends React.Component {
  state = {
    events: [],
    firstName: "",
    lastName: "",
    age: ""
  }

  componentDidMount() {
    this.handleGetData()
    this.interval = setInterval(() => {
      this.handleGetData()
    }, 5000)
  }

  componentWillUnmount() {
    clearInterval(this.interval)
  }

  handleGetData = async () => {
    const events = (await axios.get("/events")).data.slice(-5)

    this.setState({
      events
    })
  }

  renderEvents() {
    const eventMap = {
      INSERT: "created",
      UPDATE: "updated",
      DELETE: "deleted"
    }

    return this.state.events.map((event, index) => {
      const {
        record_id: id,
        first_name,
        last_name,
        age,
        old_first_name,
        old_last_name,
        old_age,
        event: eventType
      } = event

      const _event = eventMap[eventType]
      let component

      if (_event === "created") {
        component = (
          <div key={index}>
            {`Record ${id} - ${first_name} ${last_name} age ${age} was ${
              eventMap[eventType]
            }.`}
          </div>
        )
      }

      if (_event === "updated") {
        component = (
          <div key={index}>
            {`Record ${id} - ${old_first_name} ${old_last_name} age ${old_age} was updated to ${first_name} ${last_name} age ${age}.`}
          </div>
        )
      }

      if (_event === "deleted") {
        component = (
          <div key={index}>
            {`Record ${id} - ${old_first_name} ${old_last_name} age ${old_age} was deleted.`}
          </div>
        )
      }

      return component
    })
  }

  render() {
    return <div>{this.renderEvents()}</div>
  }
}

export default Index
