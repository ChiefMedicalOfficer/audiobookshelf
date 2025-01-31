const { CoverDestination } = require('../utils/constants')

class ScanOptions {
  constructor(options) {
    this.forceRescan = false

    // Server settings
    this.parseSubtitles = false
    this.findCovers = false
    this.coverDestination = CoverDestination.METADATA
    this.preferAudioMetadata = false
    this.preferOpfMetadata = false

    if (options) {
      this.construct(options)
    }
  }

  construct(options) {
    for (const key in options) {
      if (key === 'metadataPrecedence' && options[key].length) {
        this.metadataPrecedence = [...options[key]]
      } else if (this[key] !== undefined) {
        this[key] = options[key]
      }
    }
  }

  toJSON() {
    return {
      forceRescan: this.forceRescan,
      metadataPrecedence: this.metadataPrecedence,
      parseSubtitles: this.parseSubtitles,
      findCovers: this.findCovers,
      coverDestination: this.coverDestination,
      preferAudioMetadata: this.preferAudioMetadata,
      preferOpfMetadata: this.preferOpfMetadata
    }
  }

  setData(options, serverSettings) {
    this.forceRescan = !!options.forceRescan

    this.parseSubtitles = !!serverSettings.scannerParseSubtitle
    this.findCovers = !!serverSettings.scannerFindCovers
    this.coverDestination = serverSettings.coverDestination
    this.preferAudioMetadata = serverSettings.scannerPreferAudioMetadata
    this.preferOpfMetadata = serverSettings.scannerPreferOpfMetadata
  }
}
module.exports = ScanOptions