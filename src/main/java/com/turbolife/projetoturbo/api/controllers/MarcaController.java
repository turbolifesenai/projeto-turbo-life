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

import com.turbolife.projetoturbo.api.entities.Marca;
import com.turbolife.projetoturbo.api.services.MarcaService;

@RestController
@RequestMapping("/api/marcas")
public class MarcaController {
	
	@Autowired
	private MarcaService service;
	
	@GetMapping
	public List<Marca> listar() {
		return service.listar();
	}
	
	
	// GET
	@GetMapping("/{id}")
	public Marca buscar(@PathVariable Long id) {
		return service.buscarPorId(id);
	}
	
	@PostMapping
	public Marca salvar(@RequestBody Marca marca) {
		return service.salvar(marca);
	}
	
	@PutMapping("/{id}")
	public Marca atualizar(@PathVariable Long id, @RequestBody Marca dados)
	{
		return service.atualizar(id, dados);
	}
	
	@DeleteMapping("/{id}")
	public void excluir(@PathVariable Long id) {
		service.excluir(id);
	}
}
