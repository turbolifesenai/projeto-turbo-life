package com.turbolife.projetoturbo.api.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.turbolife.projetoturbo.api.entities.Carro;
import com.turbolife.projetoturbo.api.services.CarroService;

@RestController
@RequestMapping("/api/carros")
public class CarroController {
	
	@Autowired
	private CarroService service;

	@GetMapping
	public List<Carro> listar() {
		return service.listar();
	}
	
	@GetMapping("/{id}")
	public Carro buscar(@PathVariable Long id) {
		return service.buscarPorId(id);
	}
	
	@PostMapping
	public Carro salvar(@RequestBody Carro carro) {
		return service.salvar(carro);
	}
	
	@PutMapping("/{id}")
	public Carro atualizar(@PathVariable Long id, @RequestBody Carro dados)
	{
		return service.atualizar(id, dados);
	}
	
	@DeleteMapping("/{id}")
	public void excluir(@PathVariable Long id) {
		service.excluir(id);
	}
	
}
