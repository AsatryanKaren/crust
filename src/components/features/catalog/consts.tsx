import BakeryDiningOutlined from '@mui/icons-material/BakeryDiningOutlined'
import BreakfastDiningOutlined from '@mui/icons-material/BreakfastDiningOutlined'
import CakeOutlined from '@mui/icons-material/CakeOutlined'
import EnergySavingsLeafOutlined from '@mui/icons-material/EnergySavingsLeafOutlined'
import LocalCafeOutlined from '@mui/icons-material/LocalCafeOutlined'
import LunchDiningOutlined from '@mui/icons-material/LunchDiningOutlined'
import WbSunnyOutlined from '@mui/icons-material/WbSunnyOutlined'
import type { ReactNode } from 'react'
import type { SvgIconProps } from '@mui/material/SvgIcon'

import type { CategoryIcon } from '../../../types/category'

const iconProps: SvgIconProps = {
  fontSize: 'inherit',
}

/** Maps category icon ids from the API to MUI outlined icons. */
export const categoryIconMap: Record<CategoryIcon, ReactNode> = {
  pastries: <BakeryDiningOutlined {...iconProps} />,
  breads: <BreakfastDiningOutlined {...iconProps} />,
  cakes: <CakeOutlined {...iconProps} />,
  sandwiches: <LunchDiningOutlined {...iconProps} />,
  drinks: <LocalCafeOutlined {...iconProps} />,
  breakfast: <WbSunnyOutlined {...iconProps} />,
  seasonal: <EnergySavingsLeafOutlined {...iconProps} />,
}
