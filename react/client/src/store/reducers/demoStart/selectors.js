import { createSelector } from 'reselect'

export const getDemoInfo = createSelector([
  (state) => state?.demoStart?.demoStartService?.demoStartInfo,
],
  info => info
)


