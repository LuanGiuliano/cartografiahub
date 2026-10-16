/**
 * Configuração central dos sistemas e apresentações exibidos na Home.
 *
 * Cada item pode ter:
 * - `presentationId`: abre o Modo Apresentação de slides interativo.
 * - `url`: abre um sistema externo (link web).
 * Se ambos estiverem vazios/nulos, o botão exibe o status "Em breve".
 */

export const apresentacoes = {
  'o-projeto': {
    id: 'o-projeto',
    titulo: 'O Projeto',
    subtitulo: 'Cartografia de Saberes · SAGEP / SEDUC-PA',
    slideCount: 12,
    folder: '/presentations/o-projeto',
    downloadUrl: '/presentations/downloads/o-projeto.pptx',
  },
  'diagnostico-diop': {
    id: 'diagnostico-diop',
    titulo: 'Diagnóstico · DIOP',
    subtitulo: 'Diretoria de Operações e Gestão de Pessoas',
    slideCount: 17,
    folder: '/presentations/diagnostico-diop',
    downloadUrl: '/presentations/downloads/diagnostico-diop.pptx',
  },
  'diagnostico-difob': {
    id: 'diagnostico-difob',
    titulo: 'Diagnóstico · DIFOB',
    subtitulo: 'Diretoria de Formação e Desenvolvimento',
    slideCount: 19,
    folder: '/presentations/diagnostico-difob',
    downloadUrl: '/presentations/downloads/diagnostico-difob.pptx',
  },
  'diagnostico-dipse': {
    id: 'diagnostico-dipse',
    titulo: 'Diagnóstico · DIPSE',
    subtitulo: 'Diretoria de Planejamento e Seleção',
    slideCount: 18,
    folder: '/presentations/diagnostico-dipse',
    downloadUrl: '/presentations/downloads/diagnostico-dipse.pptx',
  },
  'pdi-capo': {
    id: 'pdi-capo',
    titulo: 'PDI · CAPO',
    subtitulo: 'Coordenação de Apoio Operacional',
    slideCount: 11,
    folder: '/presentations/pdi-capo',
    downloadUrl: '/presentations/downloads/pdi-capo.pptx',
  },
  'registros-fotograficos': {
    id: 'registros-fotograficos',
    titulo: 'Registros Fotográficos',
    subtitulo: 'Cartografia de Saberes · Registros de Campo',
    slideCount: 9,
    folder: '/presentations/registros-fotograficos',
    downloadUrl: '/presentations/downloads/registros-fotograficos.pptx',
  },
}

export const sistemasPrincipais = [
  {
    id: 'o-projeto',
    titulo: 'O Projeto',
    icone: 'compass',
    presentationId: 'o-projeto',
    url: '',
  },
  {
    id: 'sira',
    titulo: 'SIRA',
    icone: 'route',
    presentationId: null,
    url: 'https://sira-sagep.vercel.app/',
  },
  {
    id: 'escuta-ativa',
    titulo: 'Escuta Ativa',
    icone: 'ear',
    presentationId: null,
    url: 'https://cartografia-de-saberes.vercel.app/',
  },
  {
    id: 'registros',
    titulo: 'Registros',
    icone: 'camera',
    presentationId: 'registros-fotograficos',
    url: '',
  },
]

export const grupos = [
  {
    id: 'diagnostico',
    titulo: 'Diagnóstico',
    icone: 'map',
    url: '',
    itens: [
      { id: 'diop', sigla: 'DIOP', presentationId: 'diagnostico-diop', url: '' },
      { id: 'difob', sigla: 'DIFOB', presentationId: 'diagnostico-difob', url: '' },
      { id: 'dipse', sigla: 'DIPSE', presentationId: 'diagnostico-dipse', url: '' },
    ],
  },
  {
    id: 'pdi',
    titulo: 'PDI',
    icone: 'flag',
    url: '',
    itens: [
      { id: 'capo', sigla: 'CAPO', presentationId: 'pdi-capo', url: '' },
      { id: 'ccm', sigla: 'CCM', presentationId: null, url: 'https://diagnosticoccm.vercel.app/' },
    ],
  },
]
