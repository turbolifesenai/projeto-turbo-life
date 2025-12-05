-- ==================================================================================
-- INSERÇÃO DE MARCAS (CATEGORIAS)
-- ==================================================================================

INSERT IGNORE INTO tb_marcas (id, nome, paisDeOrigem, logoUrl) VALUES (1, 'Volkswagen', 'Alemanha', 'https://www.pngall.com/wp-content/uploads/15/Volkswagen-VW-Logo-PNG-Clipart.png');
INSERT IGNORE INTO tb_marcas (id, nome, paisDeOrigem, logoUrl) VALUES (2, 'Toyota', 'Japão', 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ed/Toyota_Symbol.svg/2560px-Toyota_Symbol.svg.png');
INSERT IGNORE INTO tb_marcas (id, nome, paisDeOrigem, logoUrl) VALUES (3, 'Ford', 'EUA', 'https://images.seeklogo.com/logo-png/5/2/ford-logo-png_seeklogo-56586.png');
INSERT IGNORE INTO tb_marcas (id, nome, paisDeOrigem, logoUrl) VALUES (4, 'Honda', 'Japão', 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/38/Honda.svg/2115px-Honda.svg.png');
INSERT IGNORE INTO tb_marcas (id, nome, paisDeOrigem, logoUrl) VALUES (5, 'Hyundai', 'Coreia do Sul', 'https://1000logos.net/wp-content/uploads/2018/04/Hyundai-Logo-1990.png');
INSERT IGNORE INTO tb_marcas (id, nome, paisDeOrigem, logoUrl) VALUES (6, 'Porsche', 'Alemanha', 'https://upload.wikimedia.org/wikipedia/de/thumb/7/70/Porsche_Logo.svg/960px-Porsche_Logo.svg.png');

-- ==================================================================================
-- INSERÇÃO DE CARROS
-- Note o uso de 'marcas_id' para fazer a ligação (Foreign Key) com a tabela acima.
-- ==================================================================================

-- Carro 1
INSERT IGNORE INTO tb_carros (id, modelo, porte, anoLancamento, descricao, capaUrl, marcas_id) 
VALUES (1, 'Nivus', 'SUV Coupé', 2020, 
'O Volkswagen Nivus é um SUV cupê compacto que combina a altura e robustez de um SUV com linhas esportivas e teto em declive, oferecendo um design inovador, alta conectividade (VW Play) e bom espaço interno, especialmente o porta-malas de 415 litros, sendo um dos modelos mais vendidos da VW no Brasil, focado em tecnologia e segurança. ', 
'https://toribaveiculos.com.br/wp-content/uploads/2025/01/Comfortline-200-TSI-1.png', 1);

-- Carro 2
INSERT IGNORE INTO tb_carros (id, modelo, porte, anoLancamento, descricao, capaUrl, marcas_id) 
VALUES (2, 'Yaris', 'Compacto', 2018,
'O Toyota Yaris é um carro compacto confiável, conhecido pelo bom espaço interno (especialmente no banco traseiro com assoalho plano), conforto, baixo custo de manutenção e boa eficiência.',
 'https://production.autoforce.com/uploads/version/profile_image/10999/comprar-xl_be6189398e.png', 2);

-- Carro 3
INSERT IGNORE INTO tb_carros (id, modelo, porte, anoLancamento, descricao, capaUrl, marcas_id) 
VALUES (3, 'Mustang', 'Esportivo', 1964, 
'O Mustang é um icônico carro esportivo da Ford, conhecido por seu design arrojado, potente motor V8 (nas versões GT/Dark Horse), ronco característico e símbolo de liberdade', 
'https://www.pngall.com/wp-content/uploads/13/Ford-Mustang-Red-PNG-Photos.png', 3);

-- Carro 4
INSERT IGNORE INTO tb_carros (id, modelo, porte, anoLancamento, descricao, capaUrl, marcas_id) 
VALUES (4, 'Civic', 'Sedan', 1992, 
'O Honda Civic é um carro icônico de segmento médio, conhecido por sua combinação de desempenho esportivo, tecnologia, confiabilidade e eficiência.', 
'https://png.pngtree.com/png-vector/20250217/ourmid/pngtree-sleek-red-honda-civic-sedan-sporty-design-aggressive-front-grille-black-png-image_15456934.png', 4);

-- Carro 5
INSERT IGNORE INTO tb_carros (id, modelo, porte, anoLancamento, descricao, capaUrl, marcas_id) 
VALUES (5, 'Tucson', 'SUV', 2005, 
'A Tucson é um SUV da Hyundai conhecido por seu design moderno, tecnologia e versatilidade.', 
'https://png.pngtree.com/png-vector/20240822/ourmid/pngtree-the-2025-hyundai-tucson-unveiled-illustration-design-png-image_13328133.png', 5);

-- Carro 6
INSERT IGNORE INTO tb_carros (id, modelo, porte, anoLancamento, descricao, capaUrl, marcas_id)
VALUES (6, 'Panamera', 'Sedan de luxo', 2009, 
'O Porsche Panamera é um sedã fastback de luxo e alta performance, que combina o conforto de um carro executivo com a esportividade de um Porsche tradicional.', 
'https://www.pngmart.com/files/22/Porsche-Panamera-PNG-Free-Download.png', 6);