const LinkedList = require('../linked-list/linked-list')
const { reverseList } = require('../linked-list/linked-list-functions')

const LanguageService = {
  getUsersLanguage(db, user_id) {
    return db
      .from('language')
      .select(
        'language.id',
        'language.name',
        'language.user_id',
        'language.head',
        'language.total_score',
      )
      .where('language.user_id', user_id)
      .first()
  },

  getLanguageWords(db, language_id) {
    return db
      .from('word')
      .select(
        'id',
        'language_id',
        'original',
        'translation',
        'next',
        'memory_value',
        'correct_count',
        'incorrect_count',
      )
      .where({ language_id })
  },

  getWordById(db, id) {
    return db
      .from('word')
      .select(
        'id',
        'language_id',
        'original',
        'translation',
        'next',
        'memory_value',
        'correct_count',
        'incorrect_count',
      )
      .where({ id })
      .first()
  },

  update(db, table, id, updates) {
    return db
      .update(updates)
      .from(table)
      .where('id', id)
      .returning('*')
      .then(([updated]) => updated);
  }, 

  async populateLLWithOrderedWords(db, language_id, headId) {
    // get words
    let list = await this.getLanguageWords(db, language_id)
    // pair word id to the word
    const wordDictionary = {}
    list.forEach(word => wordDictionary[word.id] = word)
    // populate linked list
    list = new LinkedList();
    let currWord = wordDictionary[headId]
    while (currWord) {
      list.insertFirst(currWord)
      currWord = wordDictionary[currWord.next];
    }
    reverseList(list);
    return list;
  }
}

module.exports = LanguageService
