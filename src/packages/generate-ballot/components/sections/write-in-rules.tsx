type Props = {
  esTitle: string
  esRules: string
  enTitle: string
  enRules: string
}

export default function WriteInRules({
  esTitle,
  esRules,
  enTitle,
  enRules,
}: Props) {
  return (
    <div className="p-2 text-center border border-white">
      <p className="whitespace-pre-line text-white font-semibold text-xs">
        {esTitle}
      </p>
      <p className="whitespace-pre-line text-white text-xs mt-1 rules-description">
        {esRules}
      </p>
      <p className="whitespace-pre-line text-white font-semibold mt-2 text-xs">
        {enTitle}
      </p>
      <p className="whitespace-pre-line text-white text-xs mt-1 rules-description">
        {enRules}
      </p>
    </div>
  )
}
