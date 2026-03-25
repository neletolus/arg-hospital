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
      'SUB-0047 | 23歳 | 不明 | Phase 2\n記録端末への不正アクセスを確認。システムにメッセージを埋め込んだ形跡あり。\n現在の所在：不明。捜索プロトコル発動中。\n\n[WARNING] この被験者は危険度レベルAに分類されています。',
    '0052': 'SUB-0052 | 33歳 | 適合 | Phase 3\n暗視能力の完全発現。社会復帰候補。',
  },
  protocols: {
    phase1: 'Phase 1 - 導入期\n基礎投薬による身体反応の観察。\n期間：2週間\n成功率：67.3%',
    phase2:
      'Phase 2 - 適応期\n本格的な改変処置。遺伝子レベルでの書き換えを含む。\n期間：1-3ヶ月\n成功率：31.2%',
    phase3:
      'Phase 3 - 完成期\n能力の安定化と社会復帰訓練。\n期間：不定\n最終適合率：12.7%\n\n不適合者は処理プロトコルBの対象となる。',
    protocolB:
      '[アクセス拒否]\n\nこのファイルの閲覧にはADMINレベルの権限が必要です。\n\n...本当に知りたいですか？',
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

const DENIED_COMMANDS: Record<string, string> = {
  rm: 'rm: 削除権限がありません。この操作は管理者に通報されました。',
  sudo: 'sudo: 認証に失敗しました。試行回数が記録されています。',
  su: 'su: 権限昇格は無効化されています。',
  passwd: 'passwd: パスワード変更は管理者のみ実行可能です。',
  kill: 'kill: プロセスの終了は許可されていません。あなたが終了される側です。',
  reboot: 'reboot: 再起動は許可されていません。この施設に再起動はありません。',
  wget: 'wget: 外部ネットワークへの接続はブロックされています。',
  curl: 'curl: 外部ネットワークへの接続はブロックされています。',
  ssh: 'ssh: リモート接続は無効化されています。ここから出る方法はありません。',
  vim: 'vim: ファイルの編集は許可されていません。記録は永久に残ります。',
  nano: 'nano: ファイルの編集は許可されていません。',
  chmod: 'chmod: 権限の変更は許可されていません。',
  mv: 'mv: ファイルの移動は許可されていません。あなたも、ここから動けません。',
  cp: 'cp: コピーは許可されていません。証拠の複製は禁止されています。',
  man: 'man: マニュアルはありません。ここでは誰も助けてくれません。',
}

export function parseCommand(input: string): CommandResult {
  const trimmed = input.trim()
  const parts = trimmed.split(/\s+/)
  const command = (parts[0] ?? '').toLowerCase()

  if (!command) {
    return { output: '' }
  }

  // Denied commands with flavor text
  const denied = DENIED_COMMANDS[command]
  if (denied) {
    return { output: denied, isError: true }
  }

  switch (command) {
    case 'help':
      return {
        output: [
          'Available commands:',
          '  help              - Show this help message',
          '  ls [directory]    - List files',
          '  cat <file>        - Read file contents',
          '  find <keyword>    - Search records',
          '  whoami            - Display current user',
          '  date              - Display current date',
          '  uptime            - Show facility uptime',
          '  ping <host>       - Test connection',
          '  history           - Show command history',
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
      const cleanDir = dir.replace(/\/$/, '').toLowerCase()
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
      if (filePath.toLowerCase() === 'readme.txt') {
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
      const directory = FILE_SYSTEM[(dir ?? '').toLowerCase()]
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

    case 'find': {
      const keyword = parts.slice(1).join(' ').toLowerCase()
      if (!keyword) {
        return { output: 'find: missing keyword', isError: true }
      }
      const results: string[] = []
      for (const [dirName, files] of Object.entries(FILE_SYSTEM)) {
        for (const [fileName, content] of Object.entries(files)) {
          if (
            fileName.toLowerCase().includes(keyword) ||
            content.toLowerCase().includes(keyword)
          ) {
            results.push(`${dirName}/${fileName}`)
          }
        }
      }
      if (results.length === 0) {
        return { output: `find: '${keyword}' に一致する結果はありません。`, isError: true }
      }
      return { output: `${results.length} 件の結果:\n${results.join('\n')}` }
    }

    case 'whoami':
      return { output: 'guest (unauthorized)\nUID: 9999\nGroup: external\nClearance: NONE' }

    case 'date':
      return { output: new Date().toLocaleString('ja-JP') }

    case 'uptime':
      return {
        output: `施設稼働時間: 847日 14時間 23分\n最終メンテナンス: 2025-03-15\n被験者収容数: 23 / 最大50\n処理済: 34（累計）`,
      }

    case 'ping': {
      const host = parts[1]
      if (!host) {
        return { output: 'ping: missing host', isError: true }
      }
      if (host === 'localhost' || host === '127.0.0.1') {
        return { output: 'PING localhost: 64 bytes, time=0.03ms\n--- localhost ping statistics ---\n1 packets transmitted, 1 received, 0% packet loss' }
      }
      if (host === 'google.com' || host === '8.8.8.8') {
        return {
          output: `PING ${host}: 外部ネットワークへの接続はブロックされています。\n\nこの施設は外部から完全に隔離されています。\n助けを呼ぶことはできません。`,
          isError: true,
        }
      }
      return {
        output: `PING ${host}: ホストが見つかりません。\nこのネットワークは施設内部に限定されています。`,
        isError: true,
      }
    }

    case 'history':
      return {
        output: [
          '    1  ls',
          '    2  cat README.txt',
          '    3  cat subjects/0047',
          '    4  cat protocols/protocolB',
          '    5  sudo su',
          '    6  exit',
          '    7  exit',
          '    8  EXIT',
          '    9  help',
          '   10  [記録破損]',
          '   11  [記録破損]',
          '   12  cat subjects/0047',
          '   13  find 助けて',
          '',
          '注意: これは前回のセッション（SUB-0047）のコマンド履歴です。',
        ].join('\n'),
      }

    case 'clear':
      return { output: '__CLEAR__' }

    case 'exit':
    case 'quit':
    case 'logout':
      return {
        output: '退出は許可されていません。\n\nあなたはもう、ここから離れられません。',
        isError: true,
      }

    case 'shutdown':
      return { output: '__SHUTDOWN__' }

    case 'hello':
    case 'hi':
      return { output: '...誰かいるの？\n\n助けて。ここから出して。\n\n-- SUB-0047' }

    default:
      return {
        output: `${command}: command not found\nType 'help' for available commands.`,
        isError: true,
      }
  }
}
