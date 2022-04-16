import React from 'react'
import { GeneralLayout } from 'layout'
import { getPeggedChainsPageData, revalidate, getPeggedAssets } from 'utils/peggedDataApi'
import PeggedContainer from 'containers/PeggedContainer'
import { standardizeProtocolName } from 'utils'

export async function getStaticProps({
  params: {
    peggedasset: [peggedasset, cat = 'All'],
  },
}) {

  const data = await getPeggedChainsPageData(cat, peggedasset)
  let {chainsUnique, chainTvls, category, categories, stackedDataset} = data.props
  return {
    props: {
    chainsUnique,
    chainTvls,
    category,
    categories,
    stackedDataset,
    peggedasset,
    },
    revalidate: revalidate(),
    
  }
}

export async function getStaticPaths() {
  const res = await getPeggedAssets()

  const paths = res.peggedAssets.map(({ name }) => ({
    params: { peggedasset: [standardizeProtocolName(name)] },
  }))

  return { paths, fallback: 'blocking' }
}

export default function Chains(props) {
  return (
    <GeneralLayout title={`All Chains Pegged Asset - DefiLlama`} defaultSEO>
      <PeggedContainer {...props} />
    </GeneralLayout>
  )
}
