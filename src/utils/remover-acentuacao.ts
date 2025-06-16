

export function removerAcentuacao(str: string) {
    let semAcento = str.normalize('NFD');
    semAcento = semAcento.replace(/[\u0300-\u036f]/g, '');
    return semAcento;
}