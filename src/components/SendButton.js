import React, { Component } from 'react';

class SendButton extends Component {

  constructor(props){
       super(props);

       this.state = {
          address: '',
          value: '',
          message: '',
          tag: '',
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

         console.log("iota from SendButton Component", this.props.iota);
   }

  send() {
    const seed = this.generateSeed();
    const depth = 4
    const minWeightMagnitude = 14

    const transaction =
    {
        // This is my test address
        // you can find all transactions here:
        // https://devnet.thetangle.org/address/XZRCWIPKMX9BBTEVIFEEHOQWBAYCQLRQOYTIIIR9LDYVTPBRLXOFSWZAOYMQDJDNPRNNRWIXLTWZKMK9Y
        //Address: XZRCWIPKMX9BBTEVIFEEHOQWBAYCQLRQOYTIIIR9LDYVTPBRLXOFSWZAOYMQDJDNPRNNRWIXLTWZKMK9YJDEZJYOGZ
        address: this.state.address.value,

        // Value sent to recipient
        value: 0,
        message: 'HELLO9WORLD9FROM9REACT9AND9IOTA',
        tag: 'HELLOWORLD'
    }

    console.log("Adress: " + this.state.address.value)

    const transfers = [transaction]

    this.props.iota.api.sendTransfer(seed, depth, minWeightMagnitude, transfers, (error, success) => {
        if (error) {
            console.error("sendTransfer: error", error);
        } else {
            console.log("sendTransfer: success", success);
        }
    });
  }


  generateSeed() {

    var length       = 81;                            // The length of the seed and int array.
    var chars        = "ABCDEFGHIJKLMNOPQRSTUVWXYZ9"; // The allowed characters in the seed.
    var randomValues = new Uint32Array(length);       // An empty array to store the random values.
    var result       = new Array(length);             // An empty array to store the seed characters.

    window.crypto.getRandomValues(randomValues);      // Generate random values and store them to array.

    var cursor = 0;                                   // A cursor is introduced to remove modulus bias.
    for (var i = 0; i < randomValues.length; i++) {   // Loop through each of the 81 random values.
        cursor += randomValues[i];                    // Add them to the cursor.
        result[i] = chars[cursor % chars.length];     // Assign a new character to the seed based on cursor mod 81.
    }

    return result.join('');                           // Merge the array into a single string and return it.

  };

  handleChange (evt) {
    // check it out: we get the evt.target.name (which will be either "email" or "password")
    // and use it to target the key on our `state` object with the same name, using bracket syntax

    this.setState({ [evt.target.name]: evt.target.value });
    //this.setState({value: evt.target.value});

  }

  handleSubmit (evt) {
    alert(' Adress: ' + this.state.address + ' Value: ' + this.state.value +
    ' Message: ' + this.state.message + ' Tag: ' + this.state.tag);
    evt.preventDefault();
  }


  render() {
    return (
      <div className="content">
        <div className="header-description">Blockchain Fundamentals: Wallet</div>
        <div className="user-input-form">
          <form onSubmit={this.handleSubmit}>
            <label>
              Adress:
              <input name= "address" type="text" onChange={this.handleChange} />
            </label>
            <label>
              Value:
              <input name= "value" type="text" onChange={this.handleChange} />
            </label>
            <label>
               Message:
              <input name= "message" type="text" onChange={this.handleChange} />
            </label>
            <label>
              Tag:
              <input name= "tag" type="text" onChange={this.handleChange} />
            </label>

            <input id="submt_btn" type="submit" value="Submit" onChange={this.handleSubmit} />
          </form>
        </div>

          <button onClick={this.send.bind(this)}>Send Transaction</button>
        </div>
    );
  }
}

export default SendButton;
