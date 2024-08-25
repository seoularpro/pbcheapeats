import React from 'react';
import { Typography } from '@mui/material';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import EnergySavingsLeafIcon from '@mui/icons-material/EnergySavingsLeaf';import BusinessIcon from '@mui/icons-material/Business';
import './WhyChooseUs.css'


export default function WhyChooseUs() {
 
  const Iconbox = ({ details1, details2, Icon, title }) => (
    <div className='icon_box'>
      {Icon}
      <Typography className='icon_box_h1' variant="h2" component="h1">
        {title}
      </Typography>
      <Typography className='icon_box_p' component="p">
        {details1} <br /> {details2}
      </Typography>
    </div>
  );

  return (
    <div className='why_choose_us'>
      <Typography className='leaderBoard_left_h1' variant="h2" component="h1">
        Why choose us?
      </Typography>
      {/* <Typography className='wcu_service' component="p">
        save money by avoiding all the extra fees that food delivery app
      </Typography> */}

      <div className='icon_boxes'>
        <Iconbox
          Icon={<EnergySavingsLeafIcon className='icon_box_icon' />}
          title="Save money"
          details1="No food markup cost"
          details2="Less fees"
        />
        <Iconbox
          Icon={<BusinessIcon className='icon_box_icon' />}
          title="Support PB"
          details1="Restaurants directly get paid"
          details2="Create jobs for locals"
        />
        <Iconbox
          Icon={<LocalShippingIcon className='icon_box_icon' />}
          title="Fast delivery"
          details1="Only PB area delivery"
          details2="Short delivery distance"
        />
      </div>
    </div>
  );
}