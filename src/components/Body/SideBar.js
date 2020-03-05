import React from 'react'
import Gohan from './Gohan'
import Gohan2 from './Gohan2'
const Sidebar = (props) => {
  return (
    <div className="sidebarmain">
      {props.show && <div className='sidebarfirst'>
        <div className="logo">
          {props.showTreat && <Gohan aria-label='gohan' />}
          {!props.showTreat && <Gohan2 aria-label='gohan' />}
        </div>
        <div className='infoforfirst'>
          <h2 className="title">{props.title}</h2>
          <p>{props.gohan} <br/> {props.gohan2}</p>
          <p>{props.howtoplease}</p>
          {!props.showTreat && <div>{props.button}</div>}
        </div>
      </div>}
      {!props.showotherinfo && <div className="sidebarsecond">
        <div className="secondtitle">
          <h3>About the Community</h3>
        </div>
        <div className="infoforsecond">
          <p>This community is for sharing text-based memes, asking for validation, and most importantly, gushing about how Gohan is the greatest dog ever. Please read the rules before posting!</p>
          <p>Created by <a className="about-link" href="https://github.com/HajimeNoJosh">HajimeNoJosh</a></p>
          <a className="about-link" href="https://github.com/HajimeNoJosh/reddit-project-client">Github repo</a>
          <a className="about-link" href="https://joshmartin.work">Other projects</a>
        </div>
      </div>}

      {!props.showotherinfo && <div className="sidebarsecond">
        <div className="secondtitle">
          <h3>Hajimeddit Rules</h3>
        </div>
        <div className="info-content">
          <ol>
            <li>Treat everyone with respect</li>
            <li>At least attempt to provide original content</li>
            <li>Use spellcheck before posting</li>
            <li>Brush your teeth nightly</li>
            <li>Wash your hands for at least 20 seconds</li>
          </ol>
        </div>
      </div>}
    </div>
  )
}

export default Sidebar
