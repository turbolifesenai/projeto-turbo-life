package com.turbolife.projetoturbo.api.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.turbolife.projetoturbo.api.entities.Carro;
import com.turbolife.projetoturbo.api.repositories.CarroRepository;

@Service
public class CarroService{

	@Autowired
	private CarroRepository repo;

	public List<Carro> listar() {
		return repo.findAll();
	}

	public Carro buscarPorId(Long id) {
		return repo.findById(id).orElse(null);
	}

	public Carro salvar(Carro carro) {
		return repo.save(carro);
	}

	public Carro atualizar(Long id, Carro dados) {
		Carro f = repo.findById(id).orElse(null);
		if (f == null)
			return null;

		f.setModelo(dados.getModelo());
		f.setAnoLancamento(dados.getAnoLancamento());
		f.setDescricao(dados.getDescricao());

		return repo.save(f);
	}

	public void excluir(Long id) {
		repo.deleteById(id);
	}

}