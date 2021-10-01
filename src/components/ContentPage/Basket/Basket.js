import React, { useState } from 'react'
import { connect } from 'react-redux'
import shortid from 'shortid';
import { basketList } from '../../../redux/store'
const Basket = ({ basketList }) => {
    let checkerSameId;
    const [filterBasket, setFilterBasket] = useState([])
    console.log('basketList', basketList)
    console.log('checkerSameId', checkerSameId)


    // let oldKey = '';
    // let iteration = -1;
    // const arr = [];

    // basketList.forEach(el=>{
    //     if (el.key != oldKey) {
    //         arr.push([el]);
    //         iteration++;
    //         oldKey = el.key;
    //     } else {
    //         arr[iteration] = [...arr[iteration],el];
    //     }
    // })


    const li = (item) => (
        <li key={shortid()}>
            {item.title}<input type="number"  />
        </li>
    )
    return (
        <div>
            <ol>

                {/* {
                    arr.map((el,index)=>{
                        let amount = 0;
                        el.forEach(elInsideEl=>{
                            amount++;
                        })
                        return (
                            <li>{arr[index][0].title}-{amount}</li>
                        )
                    }
                )

                } */}
                {basketList.map(item => li(item)

                    )}

                {/* {basketList.filter((thing, index) => {
  const _thing = JSON.stringify(thing);
  return index === basketList.findIndex(obj => {
    return JSON.stringify(obj) === _thing;
  })
})} */}




            </ol>





        </div>
    )
}
const mapStateToProps = state => ({
    basketList: basketList(state)
})
export default connect(mapStateToProps)(Basket)
