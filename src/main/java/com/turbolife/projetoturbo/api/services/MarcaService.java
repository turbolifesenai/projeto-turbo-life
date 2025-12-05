package com.turbolife.projetoturbo.api.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.turbolife.projetoturbo.api.entities.Marca;
import com.turbolife.projetoturbo.api.repositories.MarcaRepository;

@Service
public class MarcaService {
	
	@Autowired
	private MarcaRepository repo;
	
	public List<Marca> listar() {
		return repo.findAll();
	}
	
	public Marca buscarPorId(Long id) {
		return repo.findById(id).orElse(null);
	}
	
	public Marca salvar(Marca marca) {
		return repo.save(marca);
	}
	
	public Marca atualizar(Long id, Marca dados) {
		Marca f = repo.findById(id).orElse(null);
		if (f == null)
			return null;
		
		f.setNome(dados.getNome());
		f.setPaisDeOrigem(dados.getPaisDeOrigem());
		f.setLogoUrl(dados.getLogoUrl());
		
		return repo.save(f);
	}
	
	public void excluir(Long id) {
		repo.deleteById(id);
	}

}
