interface CommandResult {
  readonly output: string
  readonly isError?: boolean
}

const FILE_SYSTEM: Record<string, Record<string, string>> = {
  subjects: {
    '0012': 'SUB-0012 | 24歳 | 処理済 | Phase 2\n拒絶反応によりプロトコルBへ移行。',
    '0023':
      'SUB-0023 | 28歳 | 適合 | Phase 3\n筋力増強率320%。モデルケースに認定。現在、看護師として表層施設に配置。',
    '0047':
      'SUB-0047 | 25歳 | 不明 | Phase 2\n記録端末への不正アクセスを確認。システムにメッセージを埋め込んだ形跡あり。\n現在の所在：不明。捜索プロトコル発動中。\n\n[WARNING] この被験者は危険度レベルAに分類されています。',
    '0052': 'SUB-0052 | 33歳 | 適合 | Phase 3\n暗視能力の完全発現。社会復帰候補。',
  },
  protocols: {
    phase1: 'Phase 1 - 導入期\n基礎投薬による身体反応の観察。\n期間：2週間\n成功率：67.3%',
    phase2:
      'Phase 2 - 適応期\n本格的な改変処置。遺伝子レベルでの書き換えを含む。\n期間：1-3ヶ月\n成功率：31.2%',
    phase3:
      'Phase 3 - 完成期\n能力の安定化と社会復帰訓練。\n期間：不定\n最終適合率：12.7%\n\n不適合者は処理プロトコルBの対象となる。',
    protocolB: '[アクセス拒否]\n\nこのファイルの閲覧にはADMINレベルの権限が必要です。\n\n...本当に知りたいですか？',
  },
  logs: {
    latest: `[${new Date().toISOString()}] 新規アクセスを検出。
[${new Date().toISOString()}] 端末ID: EXTERNAL
[${new Date().toISOString()}] アクセス者の情報を記録中...
[${new Date().toISOString()}] 被験者候補データベースに登録処理を開始します。
[${new Date().toISOString()}] あなたのIPアドレスは記録されました。`,
    '2025-03': `[2025-03-01] SUB-0058 フェーズ1開始
[2025-03-05] SUB-0058 重篤な拒絶反応を確認
[2025-03-07] SUB-0058 処理プロトコルB適用
[2025-03-15] 新規候補者3名を選別完了
[2025-03-20] プロトコル文書v3.1.7を更新`,
  },
} as const

export function parseCommand(input: string): CommandResult {
  const trimmed = input.trim().toLowerCase()
  const parts = trimmed.split(/\s+/)
  const command = parts[0]

  if (!command) {
    return { output: '' }
  }

  switch (command) {
    case 'help':
      return {
        output: [
          'Available commands:',
          '  help              - Show this help message',
          '  ls [directory]    - List files',
          '  cat <file>        - Read file contents',
          '  whoami            - Display current user',
          '  date              - Display current date',
          '  clear             - Clear terminal',
          '  exit              - Exit terminal',
          '  shutdown          - Shutdown system',
          '',
          'Directories: subjects/ protocols/ logs/',
        ].join('\n'),
      }

    case 'ls': {
      const dir = parts[1]
      if (!dir) {
        return {
          output: 'subjects/\nprotocols/\nlogs/\nREADME.txt',
        }
      }
      const cleanDir = dir.replace(/\/$/, '')
      const directory = FILE_SYSTEM[cleanDir]
      if (!directory) {
        return {
          output: `ls: ${dir}: No such file or directory`,
          isError: true,
        }
      }
      return { output: Object.keys(directory).join('\n') }
    }

    case 'cat': {
      const filePath = parts[1]
      if (!filePath) {
        return { output: 'cat: missing operand', isError: true }
      }
      if (filePath === 'README.txt') {
        return {
          output:
            'Project Ashitaba - Internal Research Database\n\nこのシステムは研究目的でのみ使用が許可されています。\n不正アクセスは処理プロトコルBの対象となります。',
        }
      }
      const pathParts = filePath.split('/')
      if (pathParts.length !== 2) {
        return {
          output: `cat: ${filePath}: Invalid path. Use format: directory/filename`,
          isError: true,
        }
      }
      const [dir, file] = pathParts
      const directory = FILE_SYSTEM[dir ?? '']
      if (!directory) {
        return {
          output: `cat: ${filePath}: No such directory`,
          isError: true,
        }
      }
      const content = directory[file ?? '']
      if (!content) {
        return {
          output: `cat: ${filePath}: No such file`,
          isError: true,
        }
      }
      return { output: content }
    }

    case 'whoami':
      return { output: 'guest (unauthorized)' }

    case 'date':
      return { output: new Date().toLocaleString('ja-JP') }

    case 'clear':
      return { output: '__CLEAR__' }

    case 'exit':
      return {
        output: '退出は許可されていません。\n\nあなたはもう、ここから離れられません。',
        isError: true,
      }

    case 'shutdown':
      return { output: '__SHUTDOWN__' }

    default:
      return {
        output: `${command}: command not found`,
        isError: true,
      }
  }
}
